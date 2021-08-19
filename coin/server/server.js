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

var _id;
app.post("/getbaekjoon", (req, res) => {
  _id = req.body._id;
  console.log("id:" + _id);
  return res.json({
    success: "true",
  });
});

app.get("/api/baekjoon/solved", async (req, res) => {
  const problems = await handleAsync(_id);
  res.send(problems);
});
app.get("/api/baekjoon/failed", async (req, res) => {
  const problems = await handleAsync2(_id);
  res.send(problems);
});

app.use(cors());
app.use("/api", route);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Listening on port ${port}`));
