import { h } from "preact";
import { memo, useEffect } from "preact/compat";
import { IMAGE_BASE_URL, GRID_IMAGE_SIZE, POSTER_L } from "../../../../config";
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
  const { title, poster_path, name, id } = item;
  const render = () => {
    return poster_path ? (
      <div
        class={classNames(styles["collection-item"])}
        data-focus-column={index}
        data-movie-id={id}
      >
        <div class={styles["collection-item__movie-image"]}>
          <img
            src={`${IMAGE_BASE_URL}${POSTER_L}${poster_path}`}
            alt="movie"
            class={styles["collection-item__movie-image"]}
          />
        </div>
        <div class={styles["collection-item__addtolist"]}>
          <AddToList item={item} />
        </div>
      </div>
    ) : (
      ""
    );
  };

  return render();
});
CollectionItem.displayName = "CollectionTileItem";

export default CollectionItem;
