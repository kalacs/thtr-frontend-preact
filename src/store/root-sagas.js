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
import { nextRow, previousRow, getSelectedRow, getSelectedColumn } from "./ui";

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
  yield takeEvery(nextRow().type, makeScroll);
  yield takeEvery(previousRow().type, makeScroll);
}

function* makeScroll(action) {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);
  console.log("SCROLL ACTION", { row, column });
  yield put({ type: "SCROLL_TO_ROW" });
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([onRequest(), onAdditionalRequest(), onChangeRow()]);
}
