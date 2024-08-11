const {RetailerLogin} = require("../../controller/retailer")

const Route = require("express").Router()

Route.post("/", RetailerLogin)
Route.get("/", (req, res, next)=>{
    // const {email, phone, password} = req.body
    console.log(req);
    return res.send("Success")
})

module.exports = Route