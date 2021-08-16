import {
  ITEM_CREATE,
  ITEM_READ,
  ITEM_UPDATE,
  ITEM_DELETE,
} from "../_action/types";

export default function (state = {}, action) {
  switch (action.type) {
    case ITEM_CREATE:
      return { ...state, itemCSuccess: action.payload };
      break;
    case ITEM_READ:
      return { ...state, itemRSuccess: action.payload };
      break;
    case ITEM_UPDATE:
      return { ...state, itemUSuccess: action.payload };
      break;
    case ITEM_DELETE:
      return { ...state, itemDSuccess: action.payload };
      break;
    default:
      return state;
  }
}
