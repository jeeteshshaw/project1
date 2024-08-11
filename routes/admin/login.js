const UserModal = require("../../models/Users");

const Route = require("express").Router()
const admin = require("../../config/firebaseConfig")

Route.post("/", async(req, res, next)=>{
    const {email , password} = req.body
    console.log("body",req.body);

    if(!email){
        return res.status(403).json({status:"failed", message:"Email is missing"})
    }
    // console.log(`"jeet@gmail.com".match()`,"jeet@gmail.com".match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
    // if("jeet@gmail.com".match()){
    //     return res.status(403).json({status:"failed", message:"Username is missing"}).end()
    // }
    if(!password){
        return res.status(403).json({status:"failed", message:"Password is missing"})
    }

    
    const user = await UserModal.findOne({email: email})
    if(!user){
        return res.status(401).send({status:"failed", message:"Wrong Email or Password"})
    }
    console.log(password,user.password)
    if(user.comparePassword(password,user.password) && user.role==="admin"){
        const fuser =  await admin.auth().getUserByEmail(email)
        console.log('fuser', fuser)
        let token = user.createToken(user._id)
        UserModal.findByIdAndUpdate(user.id, {$set: {token: token }})
        return res.status(200).send({status: "success", message:"Successfully Logged In", data: {token: token, name: user.name,FirebaseToken: user.createToken(fuser?.uid)}})
    }
    return res.status(401).send({status:"failed", message:"Wrong Email or Password"})

})
Route.get("/", (req, res, next)=>{
    // const {email, phone, password} = req.body
    console.log(req);
    return res.send("Success")
})

module.exports = Route