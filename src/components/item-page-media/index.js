import { h, Fragment } from "preact";
import { useEffect } from "preact/hooks";
import { Box } from "@material-ui/core";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import styles from "./style.scss";
import { connect } from "react-redux";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getAdditionalData,
  requestVersions,
  getIsVersionsFetching,
  getVersions,
} from "../../store/movie";
import { branch, renderComponent, compose } from "recompose";
import Spinner from "../spinner";
import { getVersionPreference } from "../../config";
import classNames from "classnames";
import { getConfig } from "../../store/general";

const WithSpinner = (isLoading) => branch(isLoading, renderComponent(Spinner));
const enhance = compose(
  connect((state) => ({
    isLoading: getIsVersionsFetching(state),
  })),
  WithSpinner(({ isLoading }) => isLoading)
);

const ItemPageMedia = ({ versions = new Map() }) => {
  const preferredVersion = getVersionPreference()
    .map((combination) => (versions.get(combination) ? combination : undefined))
    .filter((value) => !!value)
    .pop();
  const versionsArray = Array.from(versions.entries());
  const availableVersions = versionsArray
    .map(([_, value]) => value)
    .filter((value) => !!value);
  return (
    <Fragment>
      <ToggleButtonGroup size="large" aria-label="versions">
        {availableVersions.map(({ language, quality, id }, index) => {
          const combination = `${language}-${quality}`;
          return (
            <ToggleButton
              color="secondary"
              key={index}
              value={id}
              disableRipple
              variant="outlined"
              selected={preferredVersion === combination}
            >
              {`${quality} - ${language}`}
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </Fragment>
  );
};
const WithSpinnerItemPageMedia = enhance(ItemPageMedia);
const ItemPageMediaContainer = ({
  additionalData,
  getMovieVersions,
  versions,
  appConfig,
}) => {
  const imdbId = additionalData.imdb_id;
  useEffect(() => {
    if (imdbId) {
      getMovieVersions(Object.assign({}, { id: imdbId }, appConfig));
    }
  }, [getMovieVersions, imdbId, appConfig]);
  return (
    <div class={styles["item-page-media-container"]}>
      <WithSpinnerItemPageMedia versions={versions} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMovieVersions: (params) =>
    dispatch(
      requestVersions({
        action: "getVersionsMovieData",
        params,
      })
    ),
});

const mapStateToProps = (state) => ({
  additionalData: getAdditionalData(state),
  versions: getVersions(state),
  appConfig: getConfig(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPageMediaContainer);
