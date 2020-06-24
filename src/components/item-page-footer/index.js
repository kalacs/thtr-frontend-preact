import { h } from "preact";
import styles from "./style.scss";
import { connect } from "react-redux";
import { selectTVCast, selectTVVideos } from "../../store/TVShow/tv-selectors";
import ItemPageCast from "../item-page-cast";
import { addItem, removeItem } from "../../store/List/list-actions";
import { selectListItems } from "../../store/List/list-selectors";
import { getMovieCast, getMovieVideos } from "../../store/movie";

const ItemPageFooter = ({ movieCast, tvCast, movies, tvshow }) => {
  return (
    <div class={styles["item-page-footer"]}>
      <div class={styles["item-page-footer__container"]}>
        {movies && movieCast.length
          ? movieCast
              .filter((item, index) => index < 4)
              .map(({ id, profile_path, ...otherProps }) =>
                profile_path ? (
                  <ItemPageCast
                    key={id}
                    profile_path={profile_path}
                    {...otherProps}
                  />
                ) : null
              )
          : null}
        {tvshow && tvCast.length
          ? tvCast
              .filter((item, index) => index < 4)
              .map(({ id, profile_path, ...otherProps }) =>
                profile_path ? (
                  <ItemPageCast
                    key={id}
                    profile_path={profile_path}
                    {...otherProps}
                  />
                ) : null
              )
          : null}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});

const mapStateToProps = (state) => ({
  movieCast: getMovieCast(state),
  movieVideos: getMovieVideos(state),
  tvCast: selectTVCast(state),
  tvVideos: selectTVVideos(state),
  listItems: selectListItems(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPageFooter);
