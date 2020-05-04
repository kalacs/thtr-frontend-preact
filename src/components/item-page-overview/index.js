import { h } from "preact";
import { connect } from "react-redux";
//import { createStructuredSelector } from "reselect";
import { compose } from "redux";

//import { selectIsMovieFetching } from "../../Redux/Movie/movie-selectors";

//import WithSpinnerItem from "../WithSpinner/WithSpinnerItem";

import { selectTVByTitle } from "../../store/TVShow/tv-selectors";
import ItemPage from "../item-page";
import {
  selectSearchedMovieByTitle,
  selectSearchedTVShowByTitle,
} from "../../store/Search/search-selectors";
import {
  selectListMovieByTitle,
  selectListTVShowByTitle,
} from "../../store/List/list-selectors";

const ItemPageOverview = (props) => {
  const {
    tvItemByTitle,
    movies,
    tvshow,
    searchedMovieItemByTitle,
    searchedTvItemByTitle,
    listMovieItemByTitle,
    listTvItemByTitle,
    item,
  } = props;
  const movieItemByTitle = [item];
  return (
    <div className="item-page-overview">
      {movies
        ? movieItemByTitle.map((item) => (
            <ItemPage key={item.id} item={item} movies={movies} />
          ))
        : null}
      {tvshow
        ? tvItemByTitle.map((item) => (
            <ItemPage key={item.id} item={item} tvshow={tvshow} />
          ))
        : null}
      {movieItemByTitle.length === 0
        ? searchedMovieItemByTitle
          ? searchedMovieItemByTitle.map((item) => (
              <ItemPage key={item.id} item={item} movies={movies} />
            ))
          : null
        : null}
      {tvItemByTitle.length === 0
        ? searchedTvItemByTitle
          ? searchedTvItemByTitle.map((item) => (
              <ItemPage key={item.id} item={item} tvshow={tvshow} />
            ))
          : null
        : null}
      {movieItemByTitle.length === 0 && searchedMovieItemByTitle.length === 0
        ? listMovieItemByTitle
          ? listMovieItemByTitle.map((item) => (
              <ItemPage key={item.id} item={item} movies={movies} />
            ))
          : null
        : null}
      {tvItemByTitle.length === 0 && searchedTvItemByTitle.length === 0
        ? listTvItemByTitle
          ? listTvItemByTitle.map((item) => (
              <ItemPage key={item.id} item={item} tvshow={tvshow} />
            ))
          : null
        : null}
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  tvItemByTitle: selectTVByTitle(ownProps.params.name)(state),
  searchedMovieItemByTitle: selectSearchedMovieByTitle(
    ownProps.state ? ownProps.state.id : null
  )(state),
  searchedTvItemByTitle: selectSearchedTVShowByTitle(
    ownProps.state ? ownProps.state.id : null
  )(state),
  listMovieItemByTitle: selectListMovieByTitle(
    ownProps.state ? ownProps.state.id : null
  )(state),
  listTvItemByTitle: selectListTVShowByTitle(
    ownProps.state ? ownProps.state.id : null
  )(state),
});
/*
const mapStateToProps = createStructuredSelector({
  isLoading: selectIsMovieFetching,
});
*/
const ItemPageOverviewContainer = compose()(
  connect(mapStateToProps)(ItemPageOverview)
);
//  connect(mapStateToProps),
//  WithSpinnerItem

export default ItemPageOverviewContainer;
