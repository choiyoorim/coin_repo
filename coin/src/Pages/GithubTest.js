import React from "react";
async function getContributions(token, username) {
  const headers = {
    Authorization: `bearer ${token}`,
  };
  const body = {
    query: `query {
          user(login: "${username}") {
            contributionsCollection(from: "2021-08-01T00:00:00Z" to:"2021-08-01T00:00:00Z") {
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
      .contributionDays[0];
  return data2;
}
function ContributionData() {
  const data2 = {};
  const data = getContributions(
    "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",
    "plum-king"
  ).then(
    (result) => {
      console.log(result);
    },
    function (result) {
      data2 = result;
    }
  );
  console.log(data2);
  return <h3>testing...</h3>;
}
function GithubTest() {
  return (
    <div>
      <h2>My first Github Scrapping :rocket:</h2>
      <ContributionData />
    </div>
  );
}
export default GithubTest;