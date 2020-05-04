import { h, Component } from "preact";
import { Router } from "preact-router";
import { Provider } from "react-redux";
import { store } from "../store";

import Header from "./header";

// Code-splitting is automated for routes
import Movies from "../routes/movies";
import MovieItemPage from "../routes/movie";
// Must be the first import
if (process.env.NODE_ENV === "development") {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require("preact/debug");
}

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = (e) => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <Provider store={store}>
          <Header />
          <Router onChange={this.handleRoute}>
            <Movies path="/" />
            <Movies path="/movies" />
            <MovieItemPage path="/movies/:id" />
          </Router>
        </Provider>
      </div>
    );
  }
}
