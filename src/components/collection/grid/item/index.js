import { h } from "preact";
import { memo, useEffect } from "preact/compat";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../../../config";
import styles from "./style.scss";
import AddToList from "../../../add-to-list";
import { getSelectedColumn, setSelectedMovie } from "../../../../store/ui";
import { connect } from "react-redux";

const CollectionGridItem = memo(({ item, index }) => {
  const { title, overview, backdrop_path, poster_path, name } = item;
  return (
    <div class={styles["grid-item"]} data-focus-column={index}>
      <img
        src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}`}
        alt="movie"
        class={styles["grid-item__img"]}
      />
      <img
        src={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${poster_path}`}
        alt="movie"
        class={`${styles["grid-item__img"]} ${styles["grid-item__mobile-img"]}`}
      />
      <div
        class={`${
          title ? styles["grid-item__movie-text"] : styles["grid-item__tv-text"]
        }`}
      >
        <h1 class={styles["grid-item__title"]}>{title}</h1>
        <h1 class={styles["grid-item__title"]}>{name}</h1>
        <span class={styles["grid-item__overview"]}>{overview}</span>
        <AddToList item={item} />
      </div>
    </div>
  );
});
CollectionGridItem.displayName = "CollectionGridItem";
const mapStateToProps = (state, { parentIsSelected }) => ({
  selectedColumn: parentIsSelected ? getSelectedColumn(state) : null,
});

const CollectionGridItemContainer = function (props) {
  const { parentIsSelected, index, selectedColumn, item, dispatch } = props;
  useEffect(() => {
    if (parentIsSelected && index === selectedColumn) {
      dispatch(setSelectedMovie(item));
    }
  }, [dispatch, parentIsSelected, index, selectedColumn, item]);

  return <CollectionGridItem {...props} />;
};

export default connect(mapStateToProps)(CollectionGridItemContainer);
