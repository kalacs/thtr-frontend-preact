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
    params: { id },
  } = props;
  return (
    <div className="item-page-overview">
      <ItemPage id={id} movies />
    </div>
  );
};

export default ItemPageOverview;
