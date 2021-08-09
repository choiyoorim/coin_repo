import React from "react";
import { useState, useCallback } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

const CalendarStyle = styled.div`
  .highlight {
    background-color: lightgreen;
    border-radius: 100px;
  }
`;

function CalendarTest() {
  const [value, setValue] = useState();
  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue]
  );
  const mark = ["2021-08-01", "2021-08-02", "2021-08-03"];
  return (
    <CalendarStyle>
      <div>
        <Calendar
          value={value}
          onChange={onChange}
          tileClassName={({ date, view }) => {
            if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
              return "highlight";
            }
          }}
          /*maxDate={new Date(2020, 1, 0)}</div>*/
        ></Calendar>
      </div>
    </CalendarStyle>
  );
}
export default CalendarTest;