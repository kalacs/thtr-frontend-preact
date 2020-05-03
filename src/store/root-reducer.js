import { combineReducers } from "redux";
//import TVReducer from "./TVShow/tv-reducer";
//import userReducer from "./User/user-reducer";
//import searchReducer from "./Search/search-reducer";
import collectionReducer from "./collections";
import listReducer from "./List/list-reducer";
import movieReducer from "./movie";
import uiReducer from "./ui";

export default combineReducers({
  movie: movieReducer,
  //  tv: TVReducer,
  //  user: userReducer,
  //  search: searchReducer,
  list: listReducer,
  collections: collectionReducer,
  ui: uiReducer,
});
