import { h } from "preact";
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
import { route } from "preact-router";
import {
  BUTTON_DOWN,
  BUTTON_UP,
  BUTTON_LEFT,
  BUTTON_RIGHT,
} from "../../config";

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
