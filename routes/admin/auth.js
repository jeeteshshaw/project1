const Route = require('express').Router()
const { SigninController } = require('../../controller/admin/signinController');
const { SignupController } = require('../../controller/admin/signupController');

// Route.use("/forget-password",forgetPasswordRoute);
Route.use("/login",SigninController);
Route.use("/signup",SignupController);

Route.get("/", (req, res)=>{
    console.log(req.headers);
    res.send("success")
})
module.exports = Route
