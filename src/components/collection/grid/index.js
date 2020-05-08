import { useEffect } from "preact/compat";
import styles from "./style.scss";
import CollectionGridItem from "../grid/item";
import { connect } from "react-redux";
import { requestCollectionData } from "../../../store/collections";
import { getSelectedRow } from "../../../store/ui";

const CollectionGrid = ({
  action,
  id,
  results: { data = [] },
  selectedRow,
  index,
  dispatch,
}) => {
  useEffect(() => {
    if (!data.length) {
      dispatch(requestCollectionData({ id, action }));
    }
  }, [dispatch, id, action, data]);
  const rowIsSelected = selectedRow === index;

  return (
    <div class={styles["collection-grid"]}>
      <div class={styles["collection-grid__inner"]}>
        {data
          ? data.map((item, itemIndex) => (
              <CollectionGridItem
                key={item.id}
                item={item}
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
});

export default connect(mapStateToProps)(CollectionGrid);
