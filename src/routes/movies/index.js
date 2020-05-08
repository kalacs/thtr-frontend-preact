import { h } from "preact";
import { useState } from "preact/hooks";
import { lazy, memo, Suspense } from "preact/compat";
import "./style.scss";
import { connect } from "react-redux";
import CollectionGrid from "../../components/collection/grid";
import CollectionTile from "../../components/collection/tile";
import Spinner from "../../components/spinner";
import { getCollections } from "../../store/collections";
import { getSelectedMovie } from "../../store/ui";
import { useKeyPress } from "../../hooks/key-press";
import { route } from "preact-router";

const CollectionPreview = lazy(() =>
  import("../../components/collection/preview")
);

const noop = () => {};
const handleEnter = (selectedMovie) => {
  route(`/movies/${selectedMovie.id}`, { item: selectedMovie });
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
  const [rowIndex, setRowIndex] = useState(0);
  const bounded = handleEnter.bind(null, props.selectedMovie);
  useKeyPress("Enter", noop, bounded);

  return <Movies {...props} rowIndex={rowIndex} setRowIndex={setRowIndex} />;
});
export default MovieContainer;
