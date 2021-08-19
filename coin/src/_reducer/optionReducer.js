import {
  OPTION_CREATE,
  OPTION_READ,
  OPTION_UPDATE,
  OPTION_DELETE,
} from "../_action/types";

let initOption = [];

export default function (option = initOption, action) {
  const { type, payload } = action;

  switch (type) {
    case OPTION_CREATE:
      const _inputData = {
        option_ID: payload.data,
        option_name: payload.data2[0],
        boards_board_ID: payload.data2[1],
      };
      return [...option, _inputData];
    case OPTION_READ:
      return payload.data;
    case OPTION_UPDATE:
      return option.map((rowData) => {
        if (rowData.option_ID === payload.data) {
          return {
            ...rowData,
            option_name: payload.data2,
          };
        } else {
          return rowData;
        }
      });
    case OPTION_DELETE:
      return option.filter((rowData) => rowData.option_ID !== payload.data);
    default:
      return option;
  }
}
