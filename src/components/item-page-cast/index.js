import { h, Component } from "preact";
import { IMAGE_BASE_URL, PROFILE_SIZE } from "../../config";
import styles from "./style.scss";

class ItemPageCast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didLoad: false,
    };
  }

  onLoad = () => {
    this.setState({ didLoad: true });
  };

  render() {
    const { profile_path, name } = this.props;
    const profileUrl = `${IMAGE_BASE_URL}${PROFILE_SIZE}`;
    const style = this.state.didLoad ? {} : { visibility: "hidden" };
    return (
      <div class={styles["cast"]}>
        <div class={styles["cast__img-box"]}>
          <img
            src={`${profileUrl}/${profile_path}`}
            style={style}
            alt="profile"
            class={styles["cast__img"]}
            onLoad={this.onLoad}
          />
        </div>
        <span style={style} class={styles["cast__name"]}>{`${name}`}</span>
      </div>
    );
  }
}

export default ItemPageCast;
