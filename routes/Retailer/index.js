const Route = require('express').Router()
const login = require("./login")
const signup = require("./signup")
const store = require("./store")

// Route.use(VerifyToken)

Route.use("/login", login)
Route.use("/signup", signup)
Route.use("/store", store)


Route.get("/", (req, res)=>{
    console.log(req.headers);
    res.send("success")
})


module.exports = Route