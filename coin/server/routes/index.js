var express = require('express');
const path = require('path');
var router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('../db_info');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
const authUtil = require('../middlewares/auth');
const secretKey = require('../config/secretKey').secretKey;
const options = require('../config/secretKey').options;

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use(cookieParser())

router.post("/user/register",(req,res) => {
    var param = [req.body.id,req.body.email,req.body.password,req.body.nickname]
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            console.log('bcrypt.gensalt() error : ',err.message);
        }
        else{
            bcrypt.hash(req.body.password,salt,null,function(err,hash){
                if(err) {console.log('bcrypt.hash() error: ',err.message)}
                else{
                    param[2] = hash;
                    console.log(param);
                    db.query('INSERT INTO usersinfo(`id`,`email`,`password`,`nickname`) VALUES (?,?,?,?)' , param, (err,row) =>{
                        if(err){
                            console.log(err)
                            return res.json({success:false,err})
                        }
                        return res.status(200).json({success:true});
                    })
                }
            })
        }
    })
    
})

router.post("/user/login",(req,res) =>{
    const params2 = [req.body.id,req.body.password]
    db.query('SELECT password FROM usersinfo WHERE id=?',params2[0],(err,rows,fields)=>{
        if(err||!rows[0]){
            console.log(err);
            return res.json({
                loginSuccess:false,
                message:"존재하지 않는 아이디입니다.",
            })
        }
        else{
            bcrypt.compare(params2[1],rows[0].password,function(err,res2){
                if(err){
                    console.log('bcrypt. compare() error : ',err.message);
                }
                else{
                    if(res2){
                        const jwkToken = jwt.sign(params2[0],secretKey,options);
                        console.log(jwkToken);
                        return res
                                .cookie("x_auth", jwkToken,{
                                    maxAge:3600000
                                })
                                .status(200)
                                .json({ loginSuccess: true, userId: req.body.id });
                    }
                    else{
                        return res.json({
                            loginSuccess:false,
                            message:"비밀번호가 일치하지 않습니다",
                        })
                    }
                }
            })
        }
    })
})

router.get('/user/auth',authUtil,(req,res) =>{
    var token = req.cookies.x_auth;
    let decoded = jwt.verify(token,secretKey);
    res.status(200).json({
        isAuth:true,
        id: decoded,
    })
})

router.get('/user/logout',authUtil,(req,res)=>{
    console.log("여기까지 온다!")
    return res.clearCookie('x_auth')
              .status(200)
              .json({ success: true,  });
})

router.post('/userinfo',authUtil,(req,res)=>{
    console.log('흠?')
    var id = req.body.id;
    console.log(id);
    
    db.query('SELECT nickname,email,gitId,baekjoonId FROM usersinfo WHERE id=?',id,(err,rows,fields)=>{
        console.log(rows);
        console.log(rows[0].nickname);
        
        
        if(err||!rows[0]){
            return res.json({
                success:false,
                message:"존재하지 않는 아이디입니다.",
            })
        }
        else{
            console.log('durl?')
            return res
                .status(200)
                .json({
                    success:true,
                    nickname:rows[0].nickname,
                    email:rows[0].email,
                    gitId:rows[0].gitId,
                    baekjoonId:rows[0].baekjoonId
            })
        }
    })
    
})

router.post("/gitchange",(req,res)=>{
    console.log('여기!')
    const id = req.body.id
    const gitId = req.body.gitId
    db.query("UPDATE usersinfo SET gitId=? WHERE id=?",
    [gitId,id],function(err,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send({success:true})
        }
    })
})

router.post("/baekjoonchange",(req,res)=>{
    console.log('여기!')
    const id = req.body.id
    const baekjoonId = req.body.baekjoonId
    db.query("UPDATE usersinfo SET baekjoonId=? WHERE id=?",
    [baekjoonId,id],function(err,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send({success:true})
        }
    })
})

router.post("/emailchange",(req,res)=>{
    console.log('여기!')
    const id = req.body.id
    const email = req.body.email
    db.query("UPDATE usersinfo SET email=? WHERE id=?",
    [email,id],function(err,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send({success:true})
        }
    })
})

router.post("/nicknamechange",(req,res)=>{
    console.log('여기!')
    const id = req.body.id
    const nickname = req.body.nickname
    db.query("UPDATE usersinfo SET nickname=? WHERE id=?",
    [nickname,id],function(err,result) {
        if(err){
            console.log(err);
        }
        else{
            res.send({success:true})
        }
    })
})

router.post("/pwchange",(req,res)=>{
    console.log('여기!')
    const id = req.body.id;
    const newPw = req.body.password;
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            console.log('bcrypt.gensalt() error : ',err.message);
        }
        else{
            bcrypt.hash(newPw,salt,null,function(err,hash){
                if(err) {console.log('bcrypt.hash() error: ',err.message)}
                else{
                    console.log(hash);
                    db.query("UPDATE usersinfo SET password=? WHERE id=?" , [hash,id], (err,row) =>{
                        if(err){
                            console.log(err)
                            return res.json({success:false,err})
                        }
                        return res.status(200).json({success:true});
                    })
                }
            })
        }
    })
})

router.post("/pwcheck",(req,res)=>{
    const id = req.body.id;
    const password = req.body.password;
    db.query('SELECT password FROM usersinfo WHERE id=?',id,(err,rows,fields)=>{
        if(err||!rows[0]){
            console.log(err);
            return res.json({
                success:false,
                message:"존재하지 않는 아이디입니다.",
            })
        }
        else{
            bcrypt.compare(password,rows[0].password,function(err,res2){
                if(err){
                    console.log('bcrypt. compare() error : ',err.message);
                }
                else{
                    if(res2){
                        return res
                                .status(200)
                                .json({ success: true });
                    }
                    else{
                        return res.json({
                            success:false,
                            message:"비밀번호가 일치하지 않습니다",
                        })
                    }
                }
            })
        }
    })
})

router.post("/quit",(req,res)=>{
    const id = req.body.id;
    db.query('DELETE FROM usersinfo WHERE id=?',id,(err,rows,fields)=>{
        if(err){
            res.json({success:false})
        }
        else{
            res.clearCookie('x_auth')
               .json({success:true})
        }
    })
})

router.post("/findpw",(req,res)=>{
    const id = req.body.id;
    console.log("여기:"+id);
    const email = req.body.email;
    db.query('SELECT email FROM usersinfo WHERE id=?',id,(err,rows,fields)=>{
        console.log(rows);
        if(err||!rows[0]){
            console.log(err);
            return res.json({
                success:false,
                message:"가입이 필요합니다",
            })
        }
        else{
            if(email == rows[0].email){
                return res
                        .status(200)
                        .json({ success: true });
            }
            else{
                return res.json({
                    success:false,
                    message:"정보가 일치하지 않습니다",
                })
            }
        }
    })
})

module.exports = router;