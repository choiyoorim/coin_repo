import { BOARD_CREATE, BOARD_READ, BOARD_DELETE } from "../action/types";

let initBoard = [];

export default function (board = initBoard, action) {
  const { type, payload } = action;
  console.log(board);
  switch (type) {
    case BOARD_CREATE:
      const _inputData = { board_ID: payload.data, name: payload.data2[0] };
      return [...board, _inputData];
    case BOARD_READ:
      return payload;
    case BOARD_DELETE:
      return board.filter((id) => id.board_ID !== payload.data);
    default:
      return board;
  }
}
