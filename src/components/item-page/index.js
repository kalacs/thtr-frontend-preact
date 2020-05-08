import { h, Component } from "preact";
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../../config";
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
} from "../../store/movie";

class ItemPage extends Component {
  componentDidMount() {
    return this.props.movies
      ? this.props.dispatch(
          requestAdditionalData({
            action: "getAdditionalMovieData",
            params: { id: this.props.item.id },
          })
        )
      : this.props.dispatch(getAdditionalTVData(this.props.item.id));
  }

  render() {
    const { item, movies, tvshow } = this.props;
    const {
      title,
      name,
      overview,
      backdrop_path,
      poster_path,
      vote_average,
    } = item;
    const background = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}`;
    const poster = `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`;
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
                  <span class={styles["item-rating__rank"]}>
                    {vote_average}/
                  </span>
                  <span class={styles["item-rating__ten"]}>10</span>
                  <img
                    src={star}
                    alt="imdb"
                    class={styles["item-rating__star"]}
                  />
                </div>
                <h1 class={styles["item__cast-title"]}>Cast</h1>
                <ItemPageFooter movies={movies} tvshow={tvshow} item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movieCast: getMovieCast(state),
  movieVideos: getMovieVideos(state),
});

export default connect(mapStateToProps)(ItemPage);
