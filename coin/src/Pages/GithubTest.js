import React from "react";
import moment from "moment";

let now = moment().format("YYYY-MM-DD");

const token = require("./GithubToken");
async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
          user(login: "${username}") {
            contributionsCollection(from: "${now}T00:00:00Z" to:"${now}T00:00:00Z") {
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
  console.log(data);
  const data2 =
    data.data.user.contributionsCollection.contributionCalendar.weeks[0]
      .contributionDays[0];
  return data2;
}

function ContributionData() {
  let data = getContributions(token, "plum-king").then((result) => {
    console.log(result);
    return result;
  });
  console.log(data);
  let myydata = JSON.stringify(data);
  console.log(myydata);
  let mydata = JSON.parse(JSON.stringify(data));
  console.log(mydata);
  console.log(data);

  return <h2>why</h2>;
}
function GithubTest() {
  return (
    <div>
      <h2>My first Github Scrapping 🚀</h2>
      <ContributionData />
    </div>
  );
}
export default GithubTest;
