import { h } from "preact";
import { memo } from "preact/compat";
import { Router, route } from "preact-router";
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "./header";

// Code-splitting is automated for routes
import Movies from "../routes/movies";
import MovieItemPage from "../routes/movie";
import {
  BUTTON_BACK,
  BUTTON_DOWN,
  BUTTON_UP,
  BUTTON_LEFT,
  BUTTON_RIGHT,
} from "../config";
import { useKeyPress } from "../hooks/key-press";
import { nextRow, previousRow, previousColumn, nextColumn } from "../store/ui";
// Must be the first import
if (process.env.NODE_ENV === "development") {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require("preact/debug");
}

const noop = () => {};
const App = memo(() => {
  return (
    <div id="app">
      <Provider store={store}>
        <Header />
        <Router>
          <Movies path="/" />
          <Movies path="/movies" />
          <MovieItemPage path="/movies/:id" />
        </Router>
      </Provider>
    </div>
  );
});
App.displayName = "App";

export default function AppContainer() {
  const dispatch = store.dispatch.bind(store);
  useKeyPress(BUTTON_BACK, noop, () => {
    route("/movies", true);
  });
  useKeyPress(BUTTON_DOWN, noop, () => {
    dispatch(nextRow());
  });
  useKeyPress(BUTTON_UP, noop, () => {
    dispatch(previousRow());
  });
  useKeyPress(BUTTON_LEFT, noop, () => {
    dispatch(previousColumn());
  });
  useKeyPress(BUTTON_RIGHT, noop, () => {
    dispatch(nextColumn());
  });
  return <App />;
}
