import { h } from "preact";
import { useEffect } from "preact/hooks";
import styles from "./style.scss";
import CollectionItem from "./item";
import { connect, useDispatch } from "react-redux";
import { requestCollectionData } from "../../../store/collections";

import { getSelectedRow, getSelectedColumn } from "../../../store/ui";
import { getConfig } from "../../../store/general";

const CollectionTile = ({
  title,
  results: { data = [] },
  action,
  id,
  params,
  selectedRow,
  index,
  appConfig,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data.length) {
      dispatch(
        requestCollectionData({
          id,
          action,
          params: Object.assign({}, params, appConfig),
        })
      );
    }
  }, [action, id, dispatch, params, data, appConfig]);
  const rowIsSelected = selectedRow === index;
  return (
    <div class={styles["collection-tile"]}>
      <h1 class={styles["collection-tile__title"]}>{title.toUpperCase()}</h1>
      <div class={styles["collection-tile__inner"]}>
        {data
          ? data.map((item, itemIndex) => (
              <CollectionItem
                key={item.id}
                item={item}
                movies
                index={itemIndex}
                parentIsSelected={rowIsSelected}
              />
            ))
          : null}
      </div>
    </div>
  );
};
const mapStateToProps = (state, { id, index }) => ({
  results: state.collections.datas[id],
  selectedRow: getSelectedRow(state) === index ? index : false,
  selectedColumn: getSelectedColumn(state),
  appConfig: getConfig(state),
});
const ContainerCollectionTile = connect(mapStateToProps)(CollectionTile);
ContainerCollectionTile.displayName = "ContainerCollectionTile";
export default ContainerCollectionTile;
