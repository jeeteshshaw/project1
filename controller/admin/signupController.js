const { trimData } = require("../../common/common");
const UserModal = require("../../models/Admin/Users");

const SignupController = async (req, res, next)=>{
    const {email , password, name, phone} = req.body
    console.log("body",req.body);

    if(!trimData(name)){
        return res.status(403).json({status:"failed", message:"Username is missing"})
    }
    // console.log(`"jeet@gmail.com".match()`,"jeet@gmail.com".match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
    // if("jeet@gmail.com".match()){
    //     return res.status(403).json({status:"failed", message:"Username is missing"}).end()
    // }
    if(!password){
        return res.status(403).json({status:"failed", message:"Password is missing"})
    }
    if(!email){
        return res.status(403).json({status:"failed", message:"Email is missing"})
    }
    if(!phone){
        return res.status(403).json({status:"failed", message:"Phone is missing"})
    }

    const existEmail = await UserModal.findOne({email: email})
    console.log("existEmail",existEmail)
    if(existEmail){
        return res.status(403).send({status: "failed", message:"Email Already Exits"});
    }
    const existPhone = await UserModal.findOne({phone_number: phone})
    console.log("existPhone",existPhone)
    if(existPhone){
        return res.status(403).send({status: "failed", message:"Phone Number Already Exits"});
    }
    const newUser = new UserModal();
    newUser.name = name;
    newUser.password = newUser.hashPassword(password);
    newUser.email = email.toLowerCase();
    newUser.phone_number = phone;
    let userRecord = null;
    
    const userSaved = await newUser.save()
    console.log("userSaved",userSaved)
   
    if(!userSaved)
    return res.status(400).send({status: "failed", message:"Something went Wrong", data: userSaved});

    return res.send({status: "success", message:"Successfully Created New User", data: {token: newUser.createToken(newUser._id,"1234567890"), name: newUser.name}})
}


module.exports = {
    SignupController
}