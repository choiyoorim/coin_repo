import {
  ITEM_CREATE,
  ITEM_READ,
  ITEM_UPDATE,
  ITEM_DELETE,
} from "../action/types";

let initItem = [];

export default function (item = initItem, action) {
  const { type, payload } = action;
  console.log(payload);
  console.log(item);

  switch (type) {
    case ITEM_CREATE:
      const _inputData = {
        item_ID: payload.data,
        title: payload.data2[0],
        link: payload.data2[1],
        desc: payload.data2[2],
        options_option_ID: payload.data2[3],
        options_boards_board_ID: payload.data2[4],
      };
      return [...item, _inputData];
    case ITEM_READ:
      return payload.data;
    case ITEM_UPDATE:
      return item.map((rowData) => {
        if (rowData.item_ID === payload.data) {
          return {
            ...rowData,
            title: payload.data2[0],
            link: payload.data2[1],
            desc: payload.data2[2],
            options_option_ID: payload.data2[3],
          };
        } else {
          return rowData;
        }
      });
    case ITEM_DELETE:
      return item.filter((rowData) => rowData.item_ID !== payload.data);
    default:
      return item;
  }
}
