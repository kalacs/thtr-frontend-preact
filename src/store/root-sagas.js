import { all, takeEvery, put, call } from "redux-saga/effects";
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

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([onRequest(), onAdditionalRequest()]);
}
