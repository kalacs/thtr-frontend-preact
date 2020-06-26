import {
  all,
  takeEvery,
  put,
  call,
  select,
  delay,
  takeLatest,
} from "redux-saga/effects";
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
  setVersionsIsFetching,
  requestVersions,
  versionsSuccess,
  versionsFailed,
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
  selectMovie,
  setSelectedMovie,
} from "./ui";
import {
  scrollRow,
  scrollColumn,
  getDomNode,
  removeSelectedClass,
  addSelectedClass,
} from "../utils";
import { initMovies, init, configSuccess } from "./general";
import { getConfig } from "../services/general-service";
import { SCRAPER_URL, TORRENTS_URL, API_URL, API_KEY } from "../config";
const GRID_ROW = 0;
const ITEM_PER_PAGE = 6;
const getItemPosition = (index, perPage) => index % perPage;

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

function* makeVersionRequest({ payload: { action, params } }) {
  try {
    yield put(setVersionsIsFetching(true));
    const data = yield call(movieService[action], params);
    yield put(versionsSuccess({ data }));
  } catch (error) {
    console.log("ERROR", error);
    yield put(versionsFailed({ error }));
  } finally {
    yield put(setVersionsIsFetching(false));
  }
}

function* onVersionsRequest() {
  const { type } = requestVersions();
  yield takeEvery(type, makeVersionRequest);
}

function* onChangeRow() {
  yield takeEvery(nextRow().type, makeScrollDownRequest);
  yield takeEvery(previousRow().type, makeScrollUpRequest);
}

function* makeScrollDownRequest() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn, row);

  if (row - 1 !== GRID_ROW) {
    yield call(removeSelectedClass, row - 1);
  }

  yield put(scrollToRow({ row, column }));

  if (row !== GRID_ROW) {
    yield delay(100);
    yield put(selectMovie({ row, column }));
  }
}
function* makeScrollUpRequest() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);

  yield call(removeSelectedClass, row + 1);
  yield put(scrollToRow({ row, column }));

  if (row !== GRID_ROW) {
    yield delay(100);
    yield put(selectMovie({ row, column }));
  }
}

function* onChangeColumn() {
  yield takeEvery(nextColumn().type, doSelectNextColumn);
  yield takeEvery(previousColumn().type, doSelectPreviousColumn);
}

function* doSelectNextColumn() {
  const row = yield select(getSelectedRow);
  const nextColumn = yield select(getSelectedColumn);
  // calculate if it is need to scroll
  //          ->x
  // [0,1,2,3,4]
  const nextPosition = getItemPosition(nextColumn, ITEM_PER_PAGE);
  yield put(selectMovie({ row, column: nextColumn }));

  if (nextPosition === 0) {
    yield put(scrollToColumn({ row, column: nextColumn, direction: 1 }));
  }
}
function* doSelectPreviousColumn() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);
  // calculate if it is need to scroll
  //          x<-
  // [0,1,2,3,4]
  const position = getItemPosition(column, ITEM_PER_PAGE);
  yield put(selectMovie({ row, column }));

  if (position === ITEM_PER_PAGE - 1) {
    console.log({ column, ITEM_PER_PAGE });
    yield put(
      scrollToColumn({
        row,
        column: column - (ITEM_PER_PAGE - 1),
        direction: -1,
      })
    );
  }
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
  if (column > -1) {
    yield call(scrollColumn, row, direction);
  }
}

function* onMovieInit() {
  yield takeEvery(initMovies().type, doMovieInit);
}

function* doMovieInit() {
  const row = yield select(getSelectedRow);
  const column = yield select(getSelectedColumn);
  yield put(selectMovie({ row, column }));
}

function* onSelectMovie() {
  yield takeEvery(selectMovie().type, doSelectMovie);
}
function* doSelectMovie({ payload: { row, column } }) {
  if (column > -1 && row > -1) {
    const node = getDomNode(row, column);
    yield call(removeSelectedClass, row);
    yield put(setSelectedMovie({ id: node.dataset.movieId }));
    yield call(addSelectedClass, row, column);
  }
}
function* onInit() {
  yield takeLatest(init().type, doInit);
}

function* doInit() {
  try {
    const config = yield call(getConfig);
    yield put(configSuccess(config));
  } catch (error) {
    // for dev
    yield put(
      configSuccess({
        scraperUrl: SCRAPER_URL,
        torrentsUrl: TORRENTS_URL,
        movieAPIUrl: API_URL,
        movieAPIKey: API_KEY,
      })
    );
  }
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    onInit(),
    onMovieInit(),
    onRequest(),
    onAdditionalRequest(),
    onChangeRow(),
    onChangeColumn(),
    onVerticalScrollRequest(),
    onHorizontalScrollRequest(),
    onVersionsRequest(),
    onSelectMovie(),
  ]);
}
