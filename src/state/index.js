import { createStore, applyMiddleware, compose } from "redux";
import { bindTracked } from "svelte3-redux";
import rootReducer from "./root-reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./root-sagas";
import { init } from "./general";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
let composeEnhancers = compose;

try {
  if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }
} catch (error) {
  console.log(error);
}

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middlewares))
);
sagaMiddleware.run(rootSaga);

const getTrackedState = () => bindTracked(store);

getTrackedState().dispatch(init());

export default getTrackedState;
