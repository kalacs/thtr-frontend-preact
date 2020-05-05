import { h, Component } from "preact";
import { Router, route } from "preact-router";
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "./header";

// Code-splitting is automated for routes
import Movies from "../routes/movies";
import MovieItemPage from "../routes/movie";
import { BUTTON_BACK } from "../config";
import { useKeyPress } from "../hooks/key-press";
// Must be the first import
if (process.env.NODE_ENV === "development") {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require("preact/debug");
}

const noop = () => {};
const App = () => {
  useKeyPress(BUTTON_BACK, noop, () => {
    route("/movies", true);
  });

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
};
export default App;
