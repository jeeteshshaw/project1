const UserModal = require("../models/User/Users")
const RetailersUserModal = require("../models/Retailers/Users")

const VerifyToken = (req, res, next)=>{
    console.log(req.headers);
    const {err, data} = new UserModal().verifyToken(req.headers.authentication)
    if(err){
        console.log("token", err);
        return res.status(401).send({status: "failed", message: "Token Expired or Invalid", token:"failed"})
    }
    req.headers._id = data.user_id
    next(null, true)
}
const VerifyRetailerToken = (req, res, next)=>{
    console.log(req.headers);
    const {err, data} = new RetailersUserModal().verifyToken(req.headers.authentication)
    if(err){
        console.log("token", err);
        return res.status(401).send({status: "failed", message: "Token Expired or Invalid", token:"failed"})
    }
    req.headers._id = data.user_id
    next(null, true)
}

module.exports = {
    VerifyToken,
    VerifyRetailerToken
}