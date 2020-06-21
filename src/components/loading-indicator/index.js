import { Fragment } from "preact";
import styles from "./style.css";
console.log(styles);
const DefaultMessage = () => <p>Loading . . .</p>;

const LoadingIndicator = ({ Message = DefaultMessage }) => (
  <Fragment>
    <div class={styles.overlay}>{""}</div>
    <div class={styles.spanner}>
      <div class={styles.loader}>{""}</div>
      <Message />
    </div>
  </Fragment>
);

export default LoadingIndicator;
