import { h } from "preact";
import { memo } from "preact/compat";
import { Route, useHistory } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "./header";

// Code-splitting is automated for routes
import Movies from "../routes/movies";
import MovieItemPage from "../routes/movie";
import { BUTTON_BACK, BUTTON_RED } from "../config";
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
        <Route path="/" render={() => <Movies />} />
        <Route
          path="/movies/:id"
          render={({ match }) => <MovieItemPage match={match} />}
        />
        <Route path="/movies" render={() => <Movies />} exact />
        <Route path="/player" component={Player} />
      </Provider>
    </div>
  );
});
App.displayName = "App";

export default function AppContainer() {
  const history = useHistory();
  useKeyPress(BUTTON_BACK, noop, () => {
    history.goBack();
  });

  useKeyPress(BUTTON_RED, noop, () => {
    window.location.reload();
  });

  return <App />;
}
