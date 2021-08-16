import { ITEM_CREATE, ITEM_READ, ITEM_UPDATE, ITEM_DELETE } from "./types";
import { request } from "../utils/axios";

const CONTENT_URL = "api/content";

export function createItem(dataToSubmit) {
  const data = request("get", CONTENT_URL + "/item_create", dataToSubmit);
  return {
    type: ITEM_CREATE,
    payload: data,
  };
}

export function readItem(dataToSubmit) {
  const data = request("get", CONTENT_URL + "/item", dataToSubmit);
  return {
    type: ITEM_READ,
    payload: data,
  };
}

export function updateItem(dataToSubmit) {
  const data = request("get", CONTENT_URL + "/item_update", dataToSubmit);
  return {
    type: ITEM_UPDATE,
    payload: data,
  };
}

export function deleteItem(dataToSubmit) {
  const data = request("get", CONTENT_URL + "/item_delete", dataToSubmit);
  return {
    type: ITEM_DELETE,
    payload: data,
  };
}
