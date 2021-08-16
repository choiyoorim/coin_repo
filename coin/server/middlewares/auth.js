const jwt = require('jsonwebtoken');
const TOKEN_EXPIRED = -3;
const TOKEN_INVALID = -2;
const secretKey = require('../config/secretKey').secretKey;

const authUtil = (req,res,next) =>{
        var token = req.cookies.x_auth;
        // 토큰 없음
        if (!token)
            return res.json({isAuth:false,error:true});
        // decode
        let decoded;
        try{
            decoded = jwt.verify(token,secretKey);
        }catch(err){
            if(err.message === 'jwt expired'){
                console.log('expired token');
                decoded = TOKEN_EXPIRED;
            }
            else if(err.message==='invalid token'){
                console.log('invalid token');
                console.log(TOKEN_INVALID);
                decoded = TOKEN_INVALID;
            }
            else{
                console.log("invalid token");
                decoded = TOKEN_INVALID;
            }
        }
        // 유효기간 만료
        if (decoded === TOKEN_EXPIRED)
            return res.json({isAuth:false,error:true});
        // 유효하지 않는 토큰
        if (decoded === TOKEN_INVALID)
            return res.json({isAuth:false,error:true});
        if (decoded === undefined)
            return res.json({isAuth:false,error:true});
        
        next();
}

module.exports = authUtil;