import {
  TODO_CREATE,
  TODO_READ,
  TODO_UPDATE,
  TODO_DELETE,
} from "../action/types";

let initTodo = [];

export default function (todo = initTodo, action) {
  const { type, payload } = action;

  switch (type) {
    case TODO_CREATE:
      const _inputData = {
        boj_ID: payload.data,
        number: payload.data2[0],
        usersinfo_id: payload.data2[1],
      };
      return [...todo, _inputData];
    case TODO_READ:
      return payload.data;

    case TODO_DELETE:
      return todo.filter((rowData) => rowData.boj_ID !== payload.data);
    default:
      return todo;
  }
}
