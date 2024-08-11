const Route = require("express").Router();
const {StoreUserCreate, StoreCreate} = require("../../controller/retailer");
const { VerifyRetailerToken } = require("../../middleware/tokenVerify");

Route.use(VerifyRetailerToken)

Route.post("/user-create", StoreUserCreate)
Route.post("/store-create", StoreCreate)
Route.get("/store-create", (req, res)=>{
    return res.send("Hello")
})


module.exports = Route