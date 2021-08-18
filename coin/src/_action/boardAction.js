import { BOARD_CREATE, BOARD_READ, BOARD_DELETE } from "./types";
import { request } from "../utils/axios";

const BOARD_URL = "api/content";

export function createBoard(dataToSubmit) {
  const data = request("post", BOARD_URL + "/board_create", dataToSubmit);
  return {
    type: BOARD_CREATE,
    payload: data,
  };
}

export function readBoard(dataToSubmit) {
  const data = request("post", BOARD_URL + "/board", dataToSubmit);
  return {
    type: BOARD_READ,
    payload: data,
  };
}

export function deleteBoard(dataToSubmit) {
  const data = request("post", BOARD_URL + "/board_delete", dataToSubmit);
  return {
    type: BOARD_DELETE,
    payload: data,
  };
}
