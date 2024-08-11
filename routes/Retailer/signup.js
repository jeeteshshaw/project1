const Route = require("express").Router();
const {RetailerSignup} = require("../../controller/retailer")
Route.post("/", RetailerSignup)


module.exports = Route