const axios = require("axios");
const bodyParser = require("body-parser");
const cheerio = require("cheerio");

async function getHtml(_id) {
  try {
    return await axios.get(`https://www.acmicpc.net/user/${_id}`);
  } catch (error) {
    console.error(error);
  }
}

async function getSolved() {
  if (!html) {
    html = await getHtml();
  }
  const $ = cheerio.load(html.data);
  const leng = $(".panel.panel-default").length;
  let solved = [];
  $(".panel-body")
    .first()
    .find("a")
    .each(function (key, val) {
      let problem = $(val).text();
      solved.push(problem);
    });

  return solved;
}

async function getFailed() {
  if (!html) {
    html = await getHtml();
  }
  const $ = cheerio.load(html.data);
  const leng = $(".panel.panel-default").length;
  let failed = [];
  $(".panel-body")
    .last()
    .find("a")
    .each(function (key, val) {
      let problem = $(val).text();
      failed.push(problem);
    });

  return failed;
}

module.exports = { getSolved, getFailed };
