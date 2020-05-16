import { h } from "preact";
import ReactPlayer from "react-player";
import styles from "./style.scss";
import { connect } from "react-redux";
import { getStreamUrl } from "../../store/media";

const Player = ({ url }) => {
  return (
    <div class={styles["player-container"]}>
      {url ? (
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          url={url}
          playing
          controls
        />
      ) : (
        <h1>No play</h1>
      )}
    </div>
  );
};

export default connect((state) => ({
  url: getStreamUrl(state),
}))(Player);
