import { h, options } from "preact";
import { useState } from "preact/hooks";
import { lazy, memo, Suspense } from "preact/compat";
import "./style.scss";
import { connect } from "react-redux";
import CollectionGrid from "../../components/collection/grid";
import CollectionTile from "../../components/collection/tile";
import Spinner from "../../components/spinner";
import { getCollections } from "../../store/collections";
import {
  getSelectedMovie,
  nextRow,
  previousRow,
  previousColumn,
  nextColumn,
} from "../../store/ui";
import { useKeyPress } from "../../hooks/key-press";
import {
  BUTTON_DOWN,
  BUTTON_UP,
  BUTTON_LEFT,
  BUTTON_RIGHT,
} from "../../config";
import CollectionItem from "../../components/collection/tile/item";
import { store } from "../../store";
import { initMovies } from "../../store/general";
import { withRouter } from "react-router-dom";

const ROWS = 18;
const ITEMS = 10;
let itemCount = 0;
// Store previous hook
const oldHook = options.diffed;

// Set our own options hook
options.diffed = (vnode) => {
  if (vnode.type === CollectionItem) {
    itemCount++;
    if (ROWS * ITEMS === itemCount) {
      store.dispatch(initMovies());
    }
  }

  // Call previously defined hook if there was any
  if (oldHook) {
    oldHook(vnode);
  }
};

const CollectionPreview = lazy(() =>
  import("../../components/collection/preview")
);

const noop = () => {};
const CollectionLayout = function ({ collection, index }) {
  const { layout: type, action, id } = collection;
  if (!action) return "";
  return (
    <div data-focus-row={index} id={`collection-${id}`}>
      {type === "grid" ? (
        <CollectionGrid {...collection} index={index} />
      ) : type === "film_strip" ? (
        <Suspense fallback={<Spinner />}>
          <CollectionPreview {...collection} index={index} />
        </Suspense>
      ) : type === "tile" ? (
        <CollectionTile {...collection} index={index} />
      ) : (
        ""
      )}
    </div>
  );
};

CollectionLayout.displayName = "CollectionLayout";
const Movies = memo((props) => {
  const { collections } = props;
  return (
    <div className="movies">
      {collections.map((collection, index) => {
        return (
          <CollectionLayout
            key={collection.id}
            collection={collection}
            index={index}
          />
        );
      })}
    </div>
  );
});
Movies.displayName = "Movies";
const mapStateToProps = (state) => ({
  collections: getCollections(state),
  selectedMovie: getSelectedMovie(state),
});
const MovieContainer = connect(mapStateToProps)(
  withRouter((props) => {
    const { dispatch, history } = props;
    useKeyPress("Enter", noop, () => {
      history.push(`/movies/${props.selectedMovie.id}`);
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

    return <Movies collections={props.collections} />;
  })
);
export default MovieContainer;
