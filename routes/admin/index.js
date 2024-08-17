const Route = require('express').Router()
const { VerifyToken } = require('../../middleware/tokenVerify');
const MainRouter = require("./main")
const AuthRouter = require("./auth")


Route.use("/auth", AuthRouter)
Route.use("/main", MainRouter)

Route.get("/*", (req, res)=>{
    console.log(req.headers);
    return res.send("admin success")
})
module.exports = Route