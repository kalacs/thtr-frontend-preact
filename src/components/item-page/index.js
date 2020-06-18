import { h } from "preact";
import { useEffect } from "preact/hooks";
import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  BUTTON_OK,
} from "../../config";
import styles from "./style.scss";
import { connect } from "react-redux";
import imdb from "../../assets/images/imdb.png";
import star from "../../assets/images/star.png";
import ItemPageFooter from "../item-page-footer";
import { getAdditionalTVData } from "../../store/TVShow/tv-actions";
import {
  requestAdditionalData,
  getMovieCast,
  getMovieVideos,
  getAdditionalData,
} from "../../store/movie";
import ItemPageMediaContainer from "../item-page-media";
import { noop } from "../../utils";
import { useKeyPress } from "../../hooks/key-press";
import { getConfig } from "../../store/general";
import { route } from "preact-router";
import { setStreamUrl } from "../../store/media";

const toJson = (response) => response.json();

const ItemPage = ({ item, movies, tvshow, dispatch, id, appConfig }) => {
  const { title, overview, backdrop_path, poster_path, vote_average } = item;
  const background = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}`;
  const poster = `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`;
  const { torrentsUrl, playMode } = appConfig;

  useEffect(() => {
    movies
      ? dispatch(
          requestAdditionalData({
            action: "getAdditionalMovieData",
            params: Object.assign({}, { id }, appConfig),
          })
        )
      : this.props.dispatch(getAdditionalTVData(id));
  }, [dispatch, movies, id, appConfig]);

  useKeyPress(BUTTON_OK, noop, () => {
    // get selected version
    const button = document.querySelector("button.selected[data-torrent-id]");
    const id = button.dataset.torrentId;
    // TODO refactor
    if (id) {
      // request stream server
      fetch(torrentsUrl, {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then(toJson)
        .then(({ infoHash }) => {
          const startServer = fetch(`${torrentsUrl}/${infoHash}/server`);

          if (playMode === "on-tv") {
            startServer.then(toJson).then(({ url }) =>
              fetch(`${torrentsUrl}/dlnacast`, {
                method: "POST",
                mode: "cors",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ url: `http://${url}` }),
              })
            );
          } else {
            startServer.then(toJson).then((streamServer) => {
              console.log(streamServer);
              dispatch(setStreamUrl(`http://${streamServer.url}`));
              route("/player");
            });
          }
        });
    }
  });

  return (
    <div class={styles["item-page"]}>
      <img
        src={`${background}`}
        alt="background"
        class={styles["item-page__bg"]}
      />
      <div class={styles["item"]}>
        <div class={styles["item__outer"]}>
          <div class={styles["item__inner"]}>
            <div class={styles["item__img-box"]}>
              <img
                src={`${poster}`}
                alt="poster"
                class={styles["item__poster-img"]}
              />
            </div>
            <div class={styles["item__text-box"]}>
              <h1 class={styles["item__title"]}>{title}</h1>
              <span class={styles["item__overview"]}>{overview}</span>
              <div class={styles["item-rating"]}>
                <img
                  src={imdb}
                  alt="imdb"
                  class={styles["item-rating__imdb"]}
                />
                <span class={styles["item-rating__rank"]}>{vote_average}/</span>
                <span class={styles["item-rating__ten"]}>10</span>
                <img
                  src={star}
                  alt="imdb"
                  class={styles["item-rating__star"]}
                />
              </div>
              <h2 class={styles["item__cast-title"]}>Cast</h2>
              <ItemPageFooter movies={movies} tvshow={tvshow} item={item} />
              <ItemPageMediaContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movieCast: getMovieCast(state),
  movieVideos: getMovieVideos(state),
  item: getAdditionalData(state),
  appConfig: getConfig(state),
});

export default connect(mapStateToProps)(ItemPage);
