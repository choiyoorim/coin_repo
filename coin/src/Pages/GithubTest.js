import React, { useEffect } from "react";
import { calendarPost } from "../action/calendarAction";
import { useSelector } from "react-redux";

const token = require("./GithubToken");
async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
          user(login: "${username}") {
            contributionsCollection {
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
  const saveDate = [];
  const data = await response.json();
  let calendar = data.data.user.contributionsCollection.contributionCalendar;

  //한 달만큼의 정보 저장
  for (let i = 48; i < 52; i++) {
    for (let j = 0; j < 7; j++) {
      if (calendar.weeks[i].contributionDays[j].contributionCount !== 0)
        saveDate.push(calendar.weeks[i].contributionDays[j].date);
    }
  }
  let days = calendar.weeks[52];
  for (let j = 0; j < days.contributionDays.length; j++) {
    if (days.contributionDays[j].contributionCount !== 0)
      saveDate.push(days.contributionDays[j].date);
  }
  return saveDate;
}

function GithubTest(props) {
  const _id = useSelector((state) => state.user.Id); //사용자 아이디
  const postCheck = () => {
    props.onCheck(true);
  };
  //한 달 날짜 가져오기
  useEffect(() => {
    ContributionData();
    postCheck();
  }, []);
  const ContributionData = () => {
    let body;
    let data = getContributions(token, "plum-king").then((result) => {
      for (let i = 0; i < result.length; i++) {
        body = {
          id: _id,
          date: result[i],
        };
        calendarPost(body);
      }
    });
    return;
  };
  return <div>{ContributionData}</div>;
}

export default GithubTest;
