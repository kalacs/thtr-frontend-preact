import { h } from "preact";
import { useEffect } from "preact/hooks";
import { connect } from "react-redux";
import { Typography, Box, withStyles } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../../config";
import styles from "./style.scss";
import ItemPageFooter from "../item-page-footer";
import { getAdditionalTVData } from "../../store/TVShow/tv-actions";
import {
  requestAdditionalData,
  getMovieCast,
  getMovieVideos,
  getAdditionalData,
} from "../../store/movie";
import ItemPageMediaContainer from "../item-page-media";
import { getConfig } from "../../store/general";

const StyledRating = withStyles({
  iconEmpty: {
    color: "#444444",
  },
  iconFilled: {
    color: "rgb(244, 67, 54)",
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 40 }} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon style={{ fontSize: 40 }} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon style={{ fontSize: 40 }} />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon style={{ fontSize: 40 }} />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon style={{ fontSize: 40 }} />,
    label: "Very Satisfied",
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[Math.ceil(value)].icon}</span>;
}

const ItemPage = ({ item, movies, tvshow, dispatch, id, appConfig }) => {
  const { title, overview, backdrop_path, poster_path, vote_average } = item;
  const background = `${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop_path}`;
  const poster = `${IMAGE_BASE_URL}${POSTER_SIZE}${poster_path}`;

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
              <Box mb={3}>
                <Typography variant="h3">{title}</Typography>
                <Typography variant="body1" align="justify">
                  {overview}
                </Typography>
              </Box>
              <Box mb={3}>
                <Typography variant="h5">Rating</Typography>
                <StyledRating
                  name="customized-icons"
                  value={(vote_average / 10) * 5}
                  precision={0.1}
                  IconContainerComponent={IconContainer}
                  size="large"
                  readOnly
                />
              </Box>
              <Box mb={3}>
                <Typography variant="h5">Cast</Typography>
                <ItemPageFooter movies={movies} tvshow={tvshow} item={item} />
              </Box>
              <Box mb={3}>
                <Typography variant="h5">Versions</Typography>
                <ItemPageMediaContainer />
              </Box>
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
