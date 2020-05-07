import { all, takeEvery, put, call, select } from "redux-saga/effects";
import {
  requestCollectionData,
  collectionDataSuccess,
  collectionDataFailed,
  setCollectionDataIsFetching,
} from "./collections";
import {
  setAdditionalDataIsFetching,
  requestAdditionalData,
  additionalDataSuccess,
  additionalDataFailed,
} from "./movie";
import * as movieService from "../services/movie-service";
import {
  nextRow,
  previousRow,
  getSelectedRow,
  getSelectedColumn,
  nextColumn,
  previousColumn,
  scrollToRow,
  scrollToColumn,
} from "./ui";
import {
  scrollRow,
  scrollColumn,
  getDomNode,
  removeSelectedClass,
} from "../utils";

function* makeRequest({ payload: { action, id, params } }) {
  try {
    yield put(setCollectionDataIsFetching({ id, isFetching: true }));
    const { results: data } = yield call(movieService[action], params);
    yield put(collectionDataSuccess({ id, data }));
  } catch (error) {
    console.log("ERROR", error);
    yield put(collectionDataFailed({ id, error }));
  } finally {
    yield put(setCollectionDataIsFetching({ id, isFetching: false }));
  }
}

function* onRequest() {
  const { type } = requestCollectionData();
  yield takeEvery(type, makeRequest);
}

function* makeAdditionalRequest({ payload: { action, params } }) {
  try {
    yield put(setAdditionalDataIsFetching({ isAdditionalFetching: true }));
    const data = yield call(movieService[action], params);
    yield put(additionalDataSuccess({ data }));
  } catch (error) {
    console.log("ERROR", error);
    yield put(additionalDataFailed({ error }));
  } finally {
    yield put(setAdditionalDataIsFetching({ isAdditionalFetching: false }));
  }
}

function* onAdditionalRequest() {
  const { type } = requestAdditionalData();
  yield takeEvery(type, makeAdditionalRequest);
}

function* onChangeRow() {
  yield takeEvery(nextRow().type, makeVerticalScrollRequest);
  yield takeEvery(previousRow().type, makeVerticalScrollRequest);
}

function* makeVerticalScrollRequest() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);
  yield put(scrollToRow({ row, column }));
}

function* onChangeColumn() {
  yield takeEvery(nextColumn().type, makeScrollForwardRequest);
  yield takeEvery(previousColumn().type, makeScrollBackwardRequest);
}

function* makeScrollForwardRequest() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);
  yield put(scrollToColumn({ row, column, direction: 1 }));
}

function* makeScrollBackwardRequest() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);
  yield put(scrollToColumn({ row, column, direction: -1 }));
}

function* onVerticalScrollRequest() {
  yield takeEvery(scrollToRow().type, doScrollVertical);
}

function* doScrollVertical({ payload: { row } }) {
  const node = document.querySelector(`div[data-focus-row='${row}']`);
  yield call(scrollRow, node);
}

function* onHorizontalScrollRequest() {
  yield takeEvery(scrollToColumn().type, doScrollHorizontal);
}

function* doScrollHorizontal({ payload: { row, column, direction } }) {
  const GRID_ROW = 0;
  const PREVIEW_ITEM_COUNT = 5;
  const isForward = direction > 0;
  const isBackward = !isForward;
  const checkItemIsFirst = (index, perPage) => index % perPage;
  let node;

  // grid row need to scroll always
  if (row === GRID_ROW) {
    node = getDomNode(row, column);
  }
  // should scroll only item is in new page
  else {
    const isCurrentItemIsFirst = !checkItemIsFirst(column, PREVIEW_ITEM_COUNT);
    const isPreviousItemIsFirst = !checkItemIsFirst(
      column + 1,
      PREVIEW_ITEM_COUNT
    );
    console.log({
      isForward,
      isBackward,
      isCurrentItemIsFirst,
      isPreviousItemIsFirst,
      column,
    });
    if (isForward && isCurrentItemIsFirst) {
      // scroll to current column
      node = getDomNode(row, column);
      yield call(removeSelectedClass, row);
    }

    if (isBackward && isPreviousItemIsFirst) {
      // srcoll to first column of page
      const firstItemOfPage =
        column - checkItemIsFirst(column, PREVIEW_ITEM_COUNT);
      node = getDomNode(row, firstItemOfPage);
    }
  }

  if (node) {
    yield call(scrollColumn, node);
  }
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    onRequest(),
    onAdditionalRequest(),
    onChangeRow(),
    onChangeColumn(),
    onVerticalScrollRequest(),
    onHorizontalScrollRequest(),
  ]);
}
