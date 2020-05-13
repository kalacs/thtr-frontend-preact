import { h } from "preact";
import ReactPlayer from "react-player";
import styles from "./style.scss";

const Player = () => (
  <div class={styles["player-container"]}>
    <ReactPlayer
      className="react-player"
      width="100%"
      height="100%"
      url="http://192.168.0.124:8888/0"
      playing
      controls
    />
  </div>
);

export default Player;
