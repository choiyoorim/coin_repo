const express = require("express");
const app = express();
const route = require("./routes/index");
const cors = require("cors");
const port = 5000;
//const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const { getSolved, getFailed } = require("./crawl");

async function handleAsync() {
  const problems = await getSolved();
  return problems;
}
async function handleAsync2() {
  const problems = await getFailed();
  return problems;
}

app.get("/api/baekjoon/solved", async (req, res) => {
  const problems = await handleAsync();
  res.send(problems);
});
app.get("/api/baekjoon/failed", async (req, res) => {
  const problems = await handleAsync2();
  res.send(problems);
});

app.use(cors());
app.use("/api", route);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Listening on port ${port}`));
