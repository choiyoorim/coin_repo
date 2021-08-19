import {CALENDAR_GET, CALENDAR_POST} from "./types";
import {request} from "../utils/axios";

const CALENDAR_URL = "api/content";

//날짜 가져오기
export async function calendarGet(dataToSubmit) {
  const data = await request(
    "post",
    CALENDAR_URL + "/calendar_get",
    dataToSubmit
  );
  console.log(data);
  return {
    payload: data,
  };
}

//사용자가 커밋한 날짜 저장
export function calendarPost(dataToSubmit) {
  const data = request("post", CALENDAR_URL + "/calendar_post", dataToSubmit);
  return {
    payload: data,
  };
}
