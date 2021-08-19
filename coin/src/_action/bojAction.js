import { TODO_CREATE, TODO_READ, TODO_UPDATE, TODO_DELETE } from "./types";
import { request } from "../utils/axios";

const TODO_URL = "api/content";

export function createTodo(dataToSubmit) {
  const data = request("post", TODO_URL + "/todo_create", dataToSubmit);
  return {
    type: TODO_CREATE,
    payload: data,
  };
}

export function readTodo(dataToSubmit) {
  const data = request("post", TODO_URL + "/todo", dataToSubmit);
  return {
    type: TODO_READ,
    payload: data,
  };
}

export function deleteTodo(dataToSubmit) {
  const data = request("delete", TODO_URL + "/todo_delete", dataToSubmit);
  return {
    type: TODO_DELETE,
    payload: data,
  };
}
