import React from "react";
import { useState, useCallback, useEffect, Component } from "react";
import Calendar from "react-calendar";
import { calendarGet, calendarPost } from "../action/calendarAction";
import moment from "moment";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import GithubTest from "./GithubTest";
import token from "./GithubToken";
import MailTest from "./MailTest";

const CalendarStyle = styled.div`
  .highlight {
    background-color: #cfdce8;
    border-radius: 100px;
  }
`;

const today = new Date(); //오늘 날짜 + 시간 받아오기

function CalendarTest() {
  const [mark, setMark] = useState([]);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    let body = {
      id: "lis",
    };
    calendarGet(body).then((res) => {
      setMark(res.payload);
    });
  }, []);

  useEffect(() => {}, [mark]);
  useEffect(() => {}, [check]);

  const [value, setValue] = useState();

  const onChange = useCallback(
    (value) => {
      setValue(value);
    },
    [setValue]
  );

  async function getContributions(token, username) {
    const headers = {
      Authorization: `bearer ${token}`,
    };
    const body = {
      query: `query {
            user(login: "${username}") {
              contributionsCollection(from: "${moment(today).format(
                "YYYY-MM-DD"
              )}T00:00:00Z" to:"${moment(today).format(
        "YYYY-MM-DD"
      )}T00:00:00Z") {
                contributionCalendar {
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                    }
                  }
                }
              }
            }
          }`,
    };
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    });

    const data = await response.json();

    const data2 =
      data.data.user.contributionsCollection.contributionCalendar.weeks[0]
        .contributionDays[0].contributionCount;

    if (
      data2 !== 0 &&
      mark[mark.length - 1].date !== moment(today).format("YYYY-MM-DD")
    ) {
      let body = {
        id: "lis",
        date: moment(today).format("YYYY-MM-DD"),
      };
      calendarPost(body);
    }
    return data2;
  }

  function ContributionData() {
    let data = getContributions(token, "plum-king").then((result) => {
      //아이디 바꿔야돼
      return result;
    });
    return;
  }

  const changeCheck = (data) => {
    let data2 = { date: "2001-01-01" };
    setMark(mark.concat(data2));
    setCheck(data);
  };
  console.log(mark);

  if (mark.length !== 0) {
    return (
      <>
        <CalendarStyle>
          <div>
            {ContributionData()}
            <Calendar
              value={value}
              onChange={onChange}
              tileClassName={({ date, view }) => {
                if (
                  mark.find((x) => x.date === moment(date).format("YYYY-MM-DD"))
                ) {
                  return "highlight";
                }
              }}
            ></Calendar>
          </div>
        </CalendarStyle>
        <div>
          {mark[mark.length - 1].date !==
            moment(today).format("YYYY-MM-DD") && <MailTest />}
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Calendar></Calendar>
        <GithubTest onCheck={changeCheck} />
      </div>
    );
  }
}
export default CalendarTest;
