import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import styles from "./style.scss";
import CollectionItem from "./item";
import { connect, useDispatch } from "react-redux";
import { requestCollectionData } from "../../../store/collections";
import KeyboardNavigation from "../../keyboard-navigation";

import {
  getSelectedRow,
  setSelectedColumn,
  getSelectedColumn,
} from "../../../store/ui";

const CollectionPreview = ({
  title,
  results: { data = [] },
  action,
  id,
  params,
  selectedRow,
  index,
  selectedColumn,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!data.length) {
      dispatch(requestCollectionData({ id, action, params }));
    }
  }, [action, id, dispatch, params, data]);
  const rowIsSelected = selectedRow === index;
  return (
    <Fragment>
      <div class={styles["collection-preview"]}>
        <h1 class={styles["collection-preview__title"]}>
          {title.toUpperCase()}
        </h1>
        <div class={styles["collection-preview__box"]}>
          <div class={styles["collection-preview__inner"]}>
            <KeyboardNavigation
              nextKey="ArrowRight"
              previousKey="ArrowLeft"
              enabled={rowIsSelected}
              onChange={({ index, ref }) => {
                dispatch(setSelectedColumn(index));
              }}
              currentRef={selectedColumn}
            >
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
            </KeyboardNavigation>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state, { id, index }) => ({
  results: state.collections.datas[id],
  selectedRow: getSelectedRow(state) === index ? index : false,
  selectedColumn: getSelectedColumn(state),
});

export default connect(mapStateToProps)(CollectionPreview);
