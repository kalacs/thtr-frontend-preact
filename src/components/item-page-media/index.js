import { h } from "preact";
import { useEffect } from "preact/hooks";
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

const WithSpinner = (isLoading) => branch(isLoading, renderComponent(Spinner));
const enhance = compose(
  connect((state) => ({
    isLoading: getIsVersionsFetching(state),
  })),
  WithSpinner(({ isLoading }) => isLoading)
);

const ItemPageMedia = ({ versions = new Map() }) => {
  console.log("VERSIONS", versions);
  const preferredVersion = getVersionPreference()
    .map((combination) => (versions.get(combination) ? combination : undefined))
    .filter((value) => !!value)
    .pop();
  const versionsArray = Array.from(versions.entries());
  const availableVersions = versionsArray
    .map(([_, value]) => value)
    .filter((value) => !!value);
  return (
    <div
      class={classNames(styles["item-page-footer"], styles["item-page-media"])}
    >
      <div class={styles["item-page-footer__btn-container"]}>
        {availableVersions.map(({ language, quality, id }, index) => {
          const combination = `${language}-${quality}`;
          return (
            <button
              key={index}
              class={classNames(
                styles["item-page-footer__btn"],
                styles["item-page-media__btn"],
                {
                  selected: preferredVersion === combination,
                }
              )}
              data-torrent-id={id}
            >
              <FontAwesomeIcon
                icon={faPlay}
                class={styles["item-page-footer__icon"]}
              />
              {`${quality} - ${language}`}
            </button>
          );
        })}
      </div>
    </div>
  );
};
const WithSpinnerItemPageMedia = enhance(ItemPageMedia);
const ItemPageMediaContainer = ({
  additionalData,
  getMovieVersions,
  versions,
}) => {
  const imdbId = additionalData.imdb_id;
  useEffect(() => {
    if (imdbId) {
      getMovieVersions(imdbId);
    }
  }, [getMovieVersions, imdbId]);
  return (
    <div class={styles["item-page-media-container"]}>
      <WithSpinnerItemPageMedia versions={versions} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getMovieVersions: (id) =>
    dispatch(
      requestVersions({
        action: "getVersionsMovieData",
        params: { id },
      })
    ),
});

const mapStateToProps = (state) => ({
  additionalData: getAdditionalData(state),
  versions: getVersions(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemPageMediaContainer);
