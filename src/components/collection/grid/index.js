import { useEffect, useState } from "preact/compat";
import styles from "./style.scss";
import CollectionGridItem from "../grid/item";
import { connect } from "react-redux";
import { requestCollectionData } from "../../../store/collections";
import KeyboardNavigation from "../../keyboard-navigation";
import { scrollToCell } from "../../../utils";
import { getSelectedRow, setSelectedColumn } from "../../../store/ui";

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
  const [gridIndex, setGridIndex] = useState(0);
  const rowIsSelected = selectedRow === index;

  return (
    <div class={styles["collection-grid"]}>
      <div class={styles["collection-grid__outer"]}>
        <div class={styles["collection-grid__inner"]}>
          <KeyboardNavigation
            nextKey="ArrowRight"
            previousKey="ArrowLeft"
            enabled={selectedRow === 0}
            onChange={({ index, ref }) => {
              scrollToCell(ref);
              setGridIndex(index);
              dispatch(setSelectedColumn(index));
            }}
            currentRef={gridIndex}
          >
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
          </KeyboardNavigation>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, { id, index }) => ({
  results: state.collections.datas[id],
  selectedRow: getSelectedRow(state) === index ? index : false,
});

export default connect(mapStateToProps)(CollectionGrid);
