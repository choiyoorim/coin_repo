var express = require("express");
const path = require("path");
var router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("../db_info");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const authUtil = require("../middlewares/auth");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
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
        console.log(err);
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
                .cookie("x_auth", jwkToken, {
                  maxAge: 3600000,
                })
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
  var token = req.cookies.x_auth;
  let decoded = jwt.verify(token, secretKey);
  res.status(200).json({
    isAuth: true,
    id: decoded,
  });
});

router.post("/content/board", (req, res) => {
  const param = req.body.id;
  const sql = "SELECT * FROM boards WHERE usersinfo_id=?";
  db.query(sql, param, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/content/board_create", (req, res) => {
  const params3 = [req.body.text, req.body.id];
  const sql = "INSERT INTO boards (`name`, `usersinfo_id`) VALUES (?, ?)";
  db.query(sql, params3, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("insert data success");
      return res
        .status(200)
        .json({ success: true, data: data.insertId, data2: params3 });
    }
  });
});

router.post("/content/board_delete", (req, res) => {
  const params4 = [req.body.id, req.body.user];
  const sql = "DELETE FROM boards WHERE board_ID=? AND usersinfo_id=?";
  db.query(sql, params4, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("delete data success");
      return res.status(200).json({ success: true, data: params4[0] });
    }
  });
});

router.post("/content/option", (req, res) => {
  const user_id = req.body.id;
  const sql =
    "SELECT option_ID, option_name, boards_board_ID FROM `options` WHERE boards_usersinfo_id=?";
  db.query(sql, user_id, (err, data) => {
    if (err) {
      console.log("err");
      res.send(err);
    } else {
      res.status(200).json({ success: true, data });
    }
  });
});

router.post("/content/option_create", (req, res) => {
  const params = [
    req.body.option_name,
    req.body.boards_board_ID,
    req.body.user,
  ];
  const sql =
    "INSERT INTO `options` (`option_name`, `boards_board_ID`, `boards_usersinfo_id`) VALUES (?, ?, ?)";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("insert data success");
      return res
        .status(200)
        .json({ success: true, data: data.insertId, data2: params });
    }
  });
});

router.post("/content/option_update", (req, res) => {
  const params = [req.body.option_name, req.body.option_ID];
  const sql = "UPDATE `options` SET `option_name`=? WHERE `option_ID`=?;";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("update data success");
      return res.status(200).json({
        success: true,
        data: req.body.option_ID,
        data2: req.body.option_name,
      });
    }
  });
});

router.delete("/content/option_delete", (req, res) => {
  const params = req.body.option_ID;
  const sql = "DELETE FROM `options` WHERE option_ID=?;";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("delete data success");
      return res.status(200).json({ deleteSuccess: true, data: params });
    }
  });
});

router.post("/content/item", (req, res) => {
  const user_id = req.body.id;
  const sql =
    "SELECT `item_ID`, `title`, `link`, `desc`, `options_option_ID`, `options_boards_board_ID` FROM items WHERE options_boards_usersinfo_id=?";
  db.query(sql, user_id, (err, data) => {
    if (err) {
      console.log("err!");
      res.send(err);
    } else {
      res.status(200).json({ success: true, data });
    }
  });
});

router.post("/content/item_create", (req, res) => {
  const params = [
    req.body.title,
    req.body.link,
    req.body.desc,
    req.body.option_ID,
    req.body.board_ID,
    req.body.user,
  ];
  const sql =
    "INSERT INTO `items` (`title`, `link`, `desc`, `options_option_ID`, `options_boards_board_ID`, `options_boards_usersinfo_id`) VALUES (?, ?, ?, ?, ?, ?);";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("insert data success");
      return res
        .status(200)
        .json({ success: true, data: data.insertId, data2: params });
    }
  });
});

router.post("/content/item_update", (req, res) => {
  const params = [
    req.body.title,
    req.body.link,
    req.body.desc,
    req.body.option_ID,
    req.body.item_ID,
  ];
  const sql =
    "UPDATE `items` SET `title`=?, `link`=?, `desc`=?, options_option_ID=? WHERE `item_ID`=?;";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("update data success");
      return res.status(200).json({
        success: true,
        data: params[4],
        data2: params,
      });
    }
  });
});

router.delete("/content/item_delete", (req, res) => {
  const params = req.body.item_ID;
  const sql = "DELETE FROM `items` WHERE item_ID=?;";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("delete data success");
      return res.status(200).json({ deleteSuccess: true, data: params });
    }
  });
});

router.post("/content/todo", (req, res) => {
  const user_id = req.body.id;
  const sql = "SELECT * FROM baekjoon WHERE usersinfo_id=?";
  db.query(sql, user_id, (err, data) => {
    if (err) {
      console.log("err!");
      res.send(err);
    } else {
      console.log("success");
      console.log(data);
      res.status(200).json({ success: true, data });
    }
  });
});

router.get("/user/github", (req, res) => {
  const user_id = req.body.id;
  const sql = "SELECT GithibID FROM 'usersinfo' WHERE id =?";
  db.query(sql, user_id, (err, data) => {
    if (err) {
      console.log("err");
      res.send(err);
    } else {
      res.status(200).json({ gitSuccess: true, data: data });
    }
  });
});

router.post("/content/calendar_get", (req, res) => {
  const user_id = req.body.id;
  const sql = "SELECT date FROM `github` WHERE usersinfo_id =?";
  db.query(sql, user_id, (err, data) => {
    if (err) {
      console.log("err");
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

router.post("/content/calendar_post", (req, res) => {
  const param5 = req.body.date;
  const user_id = req.body.id;
  const sql = "INSERT INTO github (`date`, `usersinfo_id`) VALUES (?, ?)";
  db.query(sql, [param5, user_id], (err, data) => {
    if (err) {
      console.log("err");
      res.send(err);
    } else {
      res.status(200).json({ success: true, data });
    }
  });
});

router.get("/user/auth", authUtil, (req, res) => {
  var token = req.cookies.x_auth;
  let decoded = jwt.verify(token, secretKey);
  res.status(200).json({
    isAuth: true,
    id: decoded,
  });
});

router.get("/user/logout", authUtil, (req, res) => {
  console.log("여기까지 온다!");
  return res.clearCookie("x_auth").status(200).json({ success: true });
});

router.post("/userinfo", authUtil, (req, res) => {
  console.log("흠?");
  var id = req.body.id;
  console.log(id);

  db.query(
    "SELECT nickname,email,gitId,baekjoonId FROM usersinfo WHERE id=?",
    id,
    (err, rows, fields) => {
      console.log(rows);
      console.log(rows[0].nickname);

      if (err || !rows[0]) {
        return res.json({
          success: false,
          message: "존재하지 않는 아이디입니다.",
        });
      } else {
        console.log("durl?");
        return res.status(200).json({
          success: true,
          nickname: rows[0].nickname,
          email: rows[0].email,
          gitId: rows[0].gitId,
          baekjoonId: rows[0].baekjoonId,
        });
      }
    }
  );
});

router.post("/gitchange", (req, res) => {
  console.log("여기!");
  const id = req.body.id;
  const gitId = req.body.gitId;
  db.query(
    "UPDATE usersinfo SET gitId=? WHERE id=?",
    [gitId, id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

router.post("/baekjoonchange", (req, res) => {
  console.log("여기!");
  const id = req.body.id;
  const baekjoonId = req.body.baekjoonId;
  db.query(
    "UPDATE usersinfo SET baekjoonId=? WHERE id=?",
    [baekjoonId, id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

router.post("/emailchange", (req, res) => {
  console.log("여기!");
  const id = req.body.id;
  const email = req.body.email;
  db.query(
    "UPDATE usersinfo SET email=? WHERE id=?",
    [email, id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

router.post("/nicknamechange", (req, res) => {
  console.log("여기!");
  const id = req.body.id;
  const nickname = req.body.nickname;
  db.query(
    "UPDATE usersinfo SET nickname=? WHERE id=?",
    [nickname, id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.send({ success: true });
      }
    }
  );
});

router.post("/pwchange", (req, res) => {
  console.log("여기!");
  const id = req.body.id;
  const newPw = req.body.password;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      console.log("bcrypt.gensalt() error : ", err.message);
    } else {
      bcrypt.hash(newPw, salt, null, function (err, hash) {
        if (err) {
          console.log("bcrypt.hash() error: ", err.message);
        } else {
          console.log(hash);
          db.query(
            "UPDATE usersinfo SET password=? WHERE id=?",
            [hash, id],
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

router.post("/pwcheck", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  db.query(
    "SELECT password FROM usersinfo WHERE id=?",
    id,
    (err, rows, fields) => {
      if (err || !rows[0]) {
        console.log(err);
        return res.json({
          success: false,
          message: "존재하지 않는 아이디입니다.",
        });
      } else {
        bcrypt.compare(password, rows[0].password, function (err, res2) {
          if (err) {
            console.log("bcrypt. compare() error : ", err.message);
          } else {
            if (res2) {
              return res.status(200).json({ success: true });
            } else {
              return res.json({
                success: false,
                message: "비밀번호가 일치하지 않습니다",
              });
            }
          }
        });
      }
    }
  );
});

router.post("/quit", (req, res) => {
  const id = req.body.id;
  db.query("DELETE FROM usersinfo WHERE id=?", id, (err, rows, fields) => {
    if (err) {
      res.json({ success: false });
    } else {
      res.clearCookie("x_auth").json({ success: true });
    }
  });
});

router.post("/findpw", (req, res) => {
  const id = req.body.id;
  console.log("여기:" + id);
  const email = req.body.email;
  db.query(
    "SELECT email FROM usersinfo WHERE id=?",
    id,
    (err, rows, fields) => {
      console.log(rows);
      if (err || !rows[0]) {
        console.log(err);
        return res.json({
          success: false,
          message: "가입이 필요합니다",
        });
      } else {
        if (email == rows[0].email) {
          return res.status(200).json({ success: true });
        } else {
          return res.json({
            success: false,
            message: "정보가 일치하지 않습니다",
          });
        }
      }
    }
  );
});
router.post("/content/todo_create", (req, res) => {
  const params = [req.body.number, req.body.user];
  const sql =
    "INSERT INTO `baekjoon` (`number`, `usersinfo_id`) VALUES (?, ?);";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("insert data success");
      return res
        .status(200)
        .json({ success: true, data: data.insertId, data2: params });
    }
  });
});

router.delete("/content/todo_delete", (req, res) => {
  const params = req.body.id;
  const sql = "DELETE FROM `baekjoon` WHERE boj_ID=?;";
  db.query(sql, params, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      console.log("delete data success");
      return res.status(200).json({ deleteSuccess: true, data: params });
    }
  });
});

router.post("/getgithub", (req, res) => {
  const id = req.body.id;
  const sql = "SELECT gitId FROM usersinfo WHERE id=?";
  db.query(sql, id, (err, rows, fields) => {
    if (err || !rows[0]) {
      return res.json({
        success: false,
      });
    } else {
      return res.json({
        success: true,
        gitId: rows[0].gitId,
      });
    }
  });
});
module.exports = router;
