import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
let composeEnhancers = compose;

try {
  if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
} catch (error) {}

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);
