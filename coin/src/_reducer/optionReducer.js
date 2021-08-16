import {
  OPTION_CREATE,
  OPTION_READ,
  OPTION_UPDATE,
  OPTION_DELETE,
} from "../_action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case OPTION_CREATE:
      return { ...state, optionCSuccess: action.payload };
      break;
    case OPTION_READ:
      return { ...state, optionRSuccess: action.payload };
      break;
    case OPTION_UPDATE:
      return { ...state, optionUSuccess: action.payload };
      break;
    case OPTION_DELETE:
      return { ...state, optionDSuccess: action.payload };
      break;
    default:
      return state;
  }
}
