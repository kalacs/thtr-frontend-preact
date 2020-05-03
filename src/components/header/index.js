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
        <img src={Logo} alt="logo" class={styles.header__logo} />
      </div>

      <div class={styles.header__options}>
        <div class={styles["header__options-primary"]}>
          <Link class={styles.header__option} to="/movies">
            Movies
          </Link>

          <Link class={styles.header__option} to="/tvshows">
            TV Shows
          </Link>

          <Link class={styles.header__option} to="/mylist">
            My List
          </Link>
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
