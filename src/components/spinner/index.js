import { h } from "preact";
import styles from "./style.scss";

const Spinner = () => {
  return (
    <div class={styles["spinner-overlay"]}>
      <div class={styles["spinner-container"]}>
        <h3>Loading ...</h3>
      </div>
    </div>
  );
};

export default Spinner;
