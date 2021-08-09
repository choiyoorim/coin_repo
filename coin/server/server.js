const express = require('express');
const app = express();
const api = require('./routes/index');
const cors = require('cors');
const axios = require("axios");
const cheerio = require("cheerio");
axios
  .get("https://www.acmicpc.net/user/sue5116")
  .then((response) => {
    const $ = cheerio.load(response.data);
    const leng = $(".panel.panel-default").length;
    console.log(leng);
    let solved = [];
    let notPerfect = [];
    let failed = [];
    const problems = $(".panel-body")
      .first()
      .find("a")
      .each(function (key, val) {
        let problem = $(val).text();
        solved.push(problem);
      });
    const problems2 = $(".panel-body")
      .last()
      .find("a")
      .each(function (key, val) {
        let problem = $(val).text();
        failed.push(problem);
        //배열로 저장해야됨
      });
    if (leng === 3) {
      const problems = $(".panel-body")
        .eq(1)
        .find("a")
        .each(function (key, val) {
          let problem = $(val).text();
          notPerfect.push(problem);
          //배열로 저장해야됨
        });
    }
    console.log(solved);
    console.log("--------------");
    console.log(notPerfect);
    console.log("--------------");
    console.log(failed);
    // console.log(problems);
  })
  .catch((response) => {
    console.log(response);
  });

app.use(cors());
app.use('/api',api);

const port = 5000;
app.listen(port,()=>console.log(`Listening on port ${port}`));