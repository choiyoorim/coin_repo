import { combineReducers } from "redux";
import user from "./userReducer";
import board from "./boardReducer";
import option from "./optionReducer";
import item from "./itemReducer";
import todo from "./bojReducer";

const rootReducer = combineReducers({
  user,
  board,
  option,
  item,
  todo,
});

export default rootReducer;
