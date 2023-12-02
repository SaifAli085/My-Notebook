var jwt = require("jsonwebtoken");

const jwt_secret = "thisissecretsign";

const fetchUser = (req, res, next) =>{
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({ error: "Please authenticate using a valid token" });
    }
    try{
        const data = jwt.verify(token, jwt_secret)
        req.user = data.user
        next();
    }catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid" })
      }
    
}

module.exports = fetchUser;
