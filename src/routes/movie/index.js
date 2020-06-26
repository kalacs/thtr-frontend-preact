import { h } from "preact";
import ItemPageOverviewContainer from "../../components/item-page-overview";
import { getSelectedMovie } from "../../store/ui";
import { connect } from "react-redux";
import { memo } from "preact/compat";
import { noop, toJson } from "../../utils";
import { useKeyPress } from "../../hooks/key-press";
import { setStreamUrl } from "../../store/media";
import { BUTTON_OK, BUTTON_GREEN } from "../../config";
import { getConfig } from "../../store/general";

const MovieItemPage = memo(({ match, dispatch, appConfig, ...props }) => {
  const { torrentsUrl, playMode } = appConfig;

  useKeyPress(BUTTON_OK, noop, () => {
    // get selected version
    const button = document.querySelector("button[aria-pressed='true']");
    const id = button.value;

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
            startServer.then(toJson).then(({ url }) => {
              dispatch(setStreamUrl(`http://${url}`));
            });
          }
        });
    }
  });

  useKeyPress(BUTTON_GREEN, noop, () => {
    const buttons = document.querySelectorAll("[aria-label='versions'] button");
    const indexOfLast = buttons.length - 1;
    let index = 0;

    buttons.forEach((button, buttonIndex) => {
      if (button.getAttribute("aria-pressed") === "true") {
        index = indexOfLast === buttonIndex ? 0 : buttonIndex + 1;
        button.setAttribute("aria-pressed", "false");
        button.classList.remove("Mui-selected");
      }

      if (buttonIndex === indexOfLast) {
        const button = buttons.item(index);
        button.setAttribute("aria-pressed", "true");
        button.classList.add("Mui-selected");
      }
    });
  });

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
  appConfig: getConfig(state),
}))(MovieItemPage);
