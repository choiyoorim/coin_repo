var express = require("express");
const path = require("path");
var router = express.Router();
//const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const db = require("../db_info");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const authUtil = require("../middlewares/auth");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cookieParser());

router.post("/user/register", (req, res) => {
  var param = [
    req.body.id,
    req.body.email,
    req.body.password,
    req.body.nickname,
  ];
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.log("bcrypt.gensalt() error : ", err.message);
    } else {
      bcrypt.hash(req.body.password, salt, null, function (err, hash) {
        if (err) {
          console.log("bcrypt.hash() error: ", err.message);
        } else {
          param[2] = hash;
          console.log(param);
          db.query(
            "INSERT INTO usersinfo(`id`,`email`,`password`,`nickname`) VALUES (?,?,?,?)",
            param,
            (err, row) => {
              if (err) {
                console.log(err);
                return res.json({ success: false, err });
              }
              return res.status(200).json({ success: true });
            }
          );
        }
      });
    }
  });
});

router.post("/user/login", (req, res) => {
  const params2 = [req.body.id, req.body.password];
  db.query(
    "SELECT password FROM usersinfo WHERE id=?",
    params2[0],
    (err, rows, fields) => {
      if (err || !rows[0]) {
        return res.json({
          loginSuccess: false,
          message: "존재하지 않는 아이디입니다.",
        });
      } else {
        bcrypt.compare(params2[1], rows[0].password, function (err, res2) {
          if (err) {
            console.log("bcrypt. compare() error : ", err.message);
          } else {
            if (res2) {
              const jwkToken = jwt.sign(params2[0], secretKey, options);
              console.log(jwkToken);
              return res
                .cookie("x_auth", jwkToken)
                .status(200)
                .json({ loginSuccess: true, userId: req.body.id });
            } else {
              return res.json({
                loginSuccess: false,
                message: "비밀번호가 일치하지 않습니다",
              });
            }
          }
        });
      }
    }
  );
});

router.get("/user/auth", authUtil, (req, res) => {
  res.status(200).json({
    isAuth: true,
    id: req.body.id,
  });
});

router.get("/content/board", (req, res) => {
  const sql = "SELECT * FROM boards WHERE usersinfo_id=?";
  db.query(sql, "lis", (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/content/board_create", (req, res) => {
  const params3 = req.body.text;
  const sql = "INSERT INTO boards (`name`, `usersinfo_id`) VALUES (?, ?)";
  db.query(sql, [params3, "lis"], (err, data) => {
    if (err) {
      res.send(err);
    }
    console.log("insert data success");
    return res
      .status(200)
      .json({ success: true, data: data.insertId, data2: params3 });
  });
});

router.post("/content/board_delete", (req, res) => {
  const params4 = req.body.id;
  console.log(params4);
  const sql = "DELETE FROM boards WHERE board_ID=? AND usersinfo_id=?";
  db.query(sql, [params4, "lis"], (err, data) => {
    if (err) {
      res.send(err);
    }
    console.log("delete data success");
    return res.status(200).json({ success: true, data: params4 });
  });
});

router.post("/content/option", (req, res) => {
  const user_id = req.body.id;
  const sql =
    "SELECT option_ID, option_name, boards_board_ID FROM `options` WHERE boards_usersinfo_id=?;";
  db.query(sql, user_id, (err, data) => {
    if (err) {
      console.log("err");
      res.send(err);
    } else {
      console.log(data);
      res.status(200).json({ success: true, data });
    }
  });
});

module.exports = router;
