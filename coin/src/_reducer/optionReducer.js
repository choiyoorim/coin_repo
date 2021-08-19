import {
  OPTION_CREATE,
  OPTION_READ,
  OPTION_UPDATE,
  OPTION_DELETE,
} from "../_action/types";

let initOption = {
  data: [],
  selectedData: {},
};

export default function (option = initOption, action) {
  const {type, payload} = action;
  switch (type) {
    case OPTION_CREATE:
      return initOption.data;
    case OPTION_READ:
      return {data: payload.data, selectedData: 0};
    case OPTION_UPDATE:
      return initOption.data;
    case OPTION_DELETE:
      return initOption.data;
    default:
      return option;
  }
}
