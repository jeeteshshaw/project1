const Route = require("express").Router();
const {StoreUserCreate, StoreCreate, StoreGet} = require("../../controller/retailer");
const { VerifyRetailerToken } = require("../../middleware/tokenVerify");

Route.use(VerifyRetailerToken)

Route.post("/user-create", StoreUserCreate)
Route.post("/store-create", StoreCreate)
Route.get("/store-get", StoreGet)
Route.get("/*", (req, res)=>{
    return res.send("Hello")
})


module.exports = Route