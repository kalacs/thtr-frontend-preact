import { h } from "preact";
import ItemPageOverviewContainer from "../../components/item-page-overview";
import { getSelectedMovie } from "../../store/ui";
import { connect } from "react-redux";

const MovieItemPage = ({ matches, ...props }) => {
  return (
    <div class="movie-item-page">
      <ItemPageOverviewContainer params={matches} item={props.item} movies />
    </div>
  );
};

export default connect((state) => ({
  item: getSelectedMovie(state),
}))(MovieItemPage);
