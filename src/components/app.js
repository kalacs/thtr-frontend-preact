import { h } from "preact";
import { memo } from "preact/compat";
import { Router, route } from "preact-router";
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "./header";

// Code-splitting is automated for routes
import Movies from "../routes/movies";
import MovieItemPage from "../routes/movie";
import { BUTTON_BACK } from "../config";
import { useKeyPress } from "../hooks/key-press";
import Player from "../routes/player";
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
          <Player path="/player" />
        </Router>
      </Provider>
    </div>
  );
});
App.displayName = "App";

export default function AppContainer() {
  useKeyPress(BUTTON_BACK, noop, () => {
    route("/movies", true);
  });
  return <App />;
}
