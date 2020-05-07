import { h } from "preact";
import { memo, useEffect } from "preact/compat";
import { IMAGE_BASE_URL, GRID_IMAGE_SIZE } from "../../../../config";
import styles from "./style.scss";
import { truncate } from "../../../../utils/index";
import AddToList from "../../../../components/add-to-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { getSelectedColumn, setSelectedMovie } from "../../../../store/ui";
import { connect } from "react-redux";
import classNames from "classnames";

const CollectionItem = memo((props) => {
  const { item, index } = props;
  const { title, overview, backdrop_path, name } = item;
  const para = truncate(overview, 155, " ..read more");
  console.log("ITEM RENDER");
  return (
    <div
      class={classNames(styles["collection-item"])}
      data-focus-column={index}
    >
      <div class={styles["collection-item__movie-image"]}>
        {backdrop_path ? (
          <img
            src={`${IMAGE_BASE_URL}${GRID_IMAGE_SIZE}${backdrop_path}`}
            alt="movie"
            class={styles["collection-item__movie-image"]}
          />
        ) : (
          <FontAwesomeIcon
            icon={faFilm}
            class={styles["collection-item__icon"]}
          />
        )}

        <div class={styles["collection-item__text"]}>
          <h1 class={styles["collection-item__title"]}>{title}</h1>
          <h2 class={styles["collection-item__title"]}>{name}</h2>
          <span class={styles["collection-item__overview"]}>{para}</span>
        </div>
      </div>
      <div class={styles["collection-item__addtolist"]}>
        <AddToList item={item} />
      </div>
    </div>
  );
});
CollectionItem.displayName = "CollectionItem";
const mapStateToProps = (state, { parentIsSelected }) => ({
  selectedColumn: parentIsSelected ? getSelectedColumn(state) : null,
});

const CollectionItemContainer = connect(mapStateToProps)(
  ({ parentIsSelected, index, selectedColumn, item, dispatch }) => {
    useEffect(() => {
      if (parentIsSelected && index === selectedColumn) {
        dispatch(setSelectedMovie(item));
      }
    }, [dispatch, parentIsSelected, index, selectedColumn, item]);
    return <CollectionItem index={index} item={item} />;
  }
);

export default CollectionItemContainer;
