import { h } from "preact";
import { Link } from "preact-router";
import Logo from "../../assets/images/logo.png";
import styles from "./style.scss";
//import SearchBar from "../SearchBar/SearchBar";
/*
import {
  selectCurrentUser,
  selectToggleHidden,
} from "../../Redux/User/user-selectors";
*/
//import { ToggleMenuHidden } from "../../Redux/User/user-actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ currentRoute = "", hidden = true }) => {
  return (
    <div class={styles.header}>
      <div class={styles["header__logo-box"]}>
        <a href="/">
          <img src={Logo} alt="logo" class={styles.header__logo} />
        </a>
      </div>
      <div class={styles.header__options}>
        <div class={styles["header__options-primary"]}>
          <a class={styles.header__option} href="/movies">
            Movies
          </a>
          <a class={styles.header__option} href="/tvshows">
            TV Shows
          </a>
          <a class={styles.header__option} href="/mylist">
            My List
          </a>
        </div>

        <div class={styles.header__searchbar}> </div>
      </div>
      <FontAwesomeIcon icon={faBars} class={styles["header__nav-menu-icon"]} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  //  currentUser: selectCurrentUser(state),
  //  hidden: selectToggleHidden(state),
});

const mapDispatchToProps = (dispatch) => ({
  //  ToggleMenuHidden: () => dispatch(ToggleMenuHidden()),
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(Header);
