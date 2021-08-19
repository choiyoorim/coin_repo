const express = require("express");
const app = express();
const route = require("./routes/index");
const cors = require("cors");
const port = 5000;
const db = require("./db_info");
//const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(cors());
app.use("/api", route);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.listen(port, () => console.log(`Listening on port ${port}`));
