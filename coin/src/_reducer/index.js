import { combineReducers } from "redux";
import user from "./userReducer";
import board from "./boardReducer";
import option from "./optionReducer";
import item from "./itemReducer";

const rootReducer = combineReducers({
  user,
  board,
  option,
  item,
});

export default rootReducer;
