import { h } from "preact";
import ItemPageOverviewContainer from "../../components/item-page-overview";
import { getSelectedMovie } from "../../store/ui";
import { connect } from "react-redux";
import { memo } from "preact/compat";

const MovieItemPage = memo(({ match, ...props }) => {
  return (
    <div class="movie-item-page">
      <ItemPageOverviewContainer
        params={match.params}
        item={props.item}
        movies
      />
    </div>
  );
});
MovieItemPage.displayName = "MovieItemPage";
export default connect((state) => ({
  item: getSelectedMovie(state),
}))(MovieItemPage);
