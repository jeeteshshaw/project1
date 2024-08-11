const Route = require('express').Router()
const { VerifyToken } = require('../../middleware/tokenVerify');
const PortfolioRouter = require("./user/Portfolio")

Route.use(VerifyToken)

Route.use("/protfolio", PortfolioRouter)

Route.get("/", (req, res)=>{
    console.log(req.headers);
    res.send("success")
})
module.exports = Route