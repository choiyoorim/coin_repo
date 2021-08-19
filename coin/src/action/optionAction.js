import {
  OPTION_CREATE,
  OPTION_READ,
  OPTION_UPDATE,
  OPTION_DELETE,
} from "./types";
import { request } from "../utils/axios";

const OPTION_URL = "api/content";

export function createOption(dataToSubmit) {
  const data = request("post", OPTION_URL + "/option_create", dataToSubmit);
  return {
    type: OPTION_CREATE,
    payload: data,
  };
}

export function readOption(dataToSubmit) {
  const data = request("post", OPTION_URL + "/option", dataToSubmit);
  return {
    type: OPTION_READ,
    payload: data,
  };
}

export function updateOption(dataToSubmit) {
  const data = request("post", OPTION_URL + "/option_update", dataToSubmit);
  return {
    type: OPTION_UPDATE,
    payload: data,
  };
}

export function deleteOption(dataToSubmit) {
  const data = request("delete", OPTION_URL + "/option_delete", dataToSubmit);
  return {
    type: OPTION_DELETE,
    payload: data,
  };
}
