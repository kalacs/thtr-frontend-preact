import { h, Component } from "preact";
import { useEffect } from "preact/hooks";
import {
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
  POSTER_SIZE,
  BUTTON_GREEN,
  BUTTON_OK,
  TORRENTS_URL,
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
import { route } from "preact-router";
import { setStreamUrl } from "../../store/media";

const ItemPage = ({ item, movies, tvshow, dispatch, id }) => {
  const { title, overview, backdrop_path, poster_path, vote_average } = item;
  const background = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}`;
  const poster = `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`;

  useEffect(() => {
    movies
      ? dispatch(
          requestAdditionalData({
            action: "getAdditionalMovieData",
            params: { id },
          })
        )
      : this.props.dispatch(getAdditionalTVData(id));
  }, [dispatch, movies, id]);

  useKeyPress(BUTTON_OK, noop, () => {
    // get selected version
    const button = document.querySelector("button.selected[data-torrent-id]");
    const id = button.dataset.torrentId;
    // TODO refactor
    if (id) {
      // request stream server
      fetch(TORRENTS_URL, {
        method: "POST",
        mode: "cors",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ id }),
      })
        .then((response) => response.json())
        .then(({ infoHash }) => {
          return fetch(`${TORRENTS_URL}/${infoHash}/server`);
        })
        .then((response) => response.json())
        .then((streamServer) => {
          dispatch(setStreamUrl(`http://${streamServer.url}`));
          route("/player");
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
});

export default connect(mapStateToProps)(ItemPage);
