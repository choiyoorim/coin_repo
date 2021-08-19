import { CALENDAR_GET, CALENDAR_POST } from "../action/types";

let saveDate = [];

export default function (date = saveDate, action) {
  const { type, payload } = action;
  switch (type) {
    case CALENDAR_GET:
      return payload.data;
    case CALENDAR_POST:
      return payload;
    default:
      return date;
  }
}
