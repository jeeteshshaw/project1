const Route = require('express').Router()
const { VerifyToken } = require('../../middleware/tokenVerify');
const CategoryRouter = require("./category")

Route.use(VerifyToken)

Route.use("/category", CategoryRouter)

Route.get("/", (req, res)=>{
    console.log(req.headers);
    res.send("success")
})
module.exports = Route