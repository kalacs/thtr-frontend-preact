import { h, options } from "preact";
import { useState, useEffect } from "preact/hooks";
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
import { route } from "preact-router";
import {
  BUTTON_DOWN,
  BUTTON_UP,
  BUTTON_LEFT,
  BUTTON_RIGHT,
} from "../../config";
import CollectionItem from "../../components/collection/tile/item";
import { store } from "../../store";
import { initRouteMovies } from "../../store/general";

const ROWS = 22;
const ITEMS = 10;
let itemCount = 0;

// Store previous hook
const oldHook = options.diffed;
/*
// Set our own options hook
options.diffed = (vnode) => {
  if (vnode.type === CollectionItem) {
    itemCount++;
    if (ROWS * ITEMS === itemCount) {
      console.log("movies init");
      store.dispatch(initRouteMovies());
      itemCount = 0;
    }
  }

  // Call previously defined hook if there was any
  if (oldHook) {
    oldHook(vnode);
  }
};
*/
// Store previous hook
const oldHook2 = options.vnode;

// Set our own options hook
options.vnode = (vnode) => {
  if (vnode.type === CollectionItem) {
    itemCount++;
    if (ROWS * ITEMS === itemCount) {
      console.log("movies init");
      store.dispatch(initRouteMovies());
      itemCount = 0;
    }
  }
  // Call previously defined hook if there was any
  if (oldHook2) {
    oldHook2(vnode);
  }
};

const CollectionPreview = lazy(() =>
  import("../../components/collection/preview")
);

const noop = () => {};
const handleEnter = (selectedMovie) => {
  route(`/movies/${selectedMovie.id}`);
};
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
const Movies = memo(({ collections }) => {
  useEffect(() => {
    console.log("movies mounted");
  }, []);

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
const MovieContainer = connect(mapStateToProps)((props) => {
  const bounded = handleEnter.bind(null, props.selectedMovie);
  const { dispatch } = props;
  useKeyPress("Enter", noop, bounded);

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

  return <Movies {...props} />;
});
export default MovieContainer;
