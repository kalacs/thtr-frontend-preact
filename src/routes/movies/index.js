import { h } from "preact";
import { useState } from "preact/hooks";
import { lazy, memo, Suspense } from "preact/compat";
import "./style.scss";
import { connect } from "react-redux";
import CollectionGrid from "../../components/collection/grid";
import Spinner from "../../components/spinner";
import { getCollections } from "../../store/collections";
import KeyboardNavigation from "../../components/keyboard-navigation";
import { scrollToRow } from "../../utils";
import { setSelectedRow, getSelectedMovie } from "../../store/ui";
import { useKeyPress } from "../../hooks/key-press";
import { route } from "preact-router";

const CollectionPreview = lazy(() =>
  import("../../components/collection/preview")
);

const noop = () => {};
const handleEnter = (selectedMovie) => {
  route(`/movies/${selectedMovie.id}`, { item: selectedMovie });
};
const CollectionLayout = function (props) {
  const { collection, navRef, index } = props;
  const { layout: type, action, id } = collection;
  if (!action) return "";
  return (
    <div ref={navRef} id={`collection-${id}`}>
      {type === "grid" ? (
        <CollectionGrid {...collection} index={index} />
      ) : type === "film_strip" ? (
        <Suspense fallback={<Spinner />}>
          <CollectionPreview {...collection} index={index} />
        </Suspense>
      ) : (
        ""
      )}
    </div>
  );
};

CollectionLayout.displayName = "CollectionLayout";
const Movies = memo(({ collections, rowIndex, setRowIndex, dispatch }) => {
  return (
    <div className="movies">
      <KeyboardNavigation
        nextKey="ArrowDown"
        previousKey="ArrowUp"
        enabled
        onChange={({ index, ref }) => {
          scrollToRow(ref);
          setRowIndex(index);
          dispatch(setSelectedRow(index));
        }}
        currentRef={rowIndex}
      >
        {collections.map((collection, index) => {
          return (
            <CollectionLayout
              key={collection.id}
              collection={collection}
              index={index}
            />
          );
        })}
      </KeyboardNavigation>
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
