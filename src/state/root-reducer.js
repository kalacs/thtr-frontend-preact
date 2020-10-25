import { combineReducers } from "redux";
import TVReducer from "./TVShow/tv-reducer";
//import userReducer from "./User/user-reducer";
import searchReducer from "./Search/search-reducer";
import listReducer from "./List/list-reducer";
import movieReducer from "./movie";
import uiReducer from "./ui";
import mediaReducer from "./media";
import generalReducer from "./general";

export default combineReducers({
  movie: movieReducer,
  tv: TVReducer,
  //  user: userReducer,
  search: searchReducer,
  list: listReducer,
  ui: uiReducer,
  media: mediaReducer,
  general: generalReducer,
});
