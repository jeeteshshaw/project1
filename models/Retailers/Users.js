const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const Schema = mongoose.Schema;
const secretKey =  fs.readFileSync("./cert/private.pem");
const publicKey =  fs.readFileSync("./cert/public.pem");

const RetailerUsersSchema = new Schema({
    name: {
        type:String,
        require: true,
        min: 4,
        max: 50,
    },
    email:{
        type:String,
        require: true,
        unique:true,
        min: 4,
        max: 100,
    },
    password:{
        type:String,
        require: true,
    },
    phone_code:{
        type:String,
        require: true,
        min: 1,
        max: 20,
        default:"+91"
    },
    phone_number:{
        type:String,
        require: true,
        min: 10,
        unique:true,
        max: 11
    },
    profile_image:{
        type:String,
        required: true,
    },
    role:{
        type:String,
        default: "retailer",
    },
    resetPasswordToken:{
        type:String,
        default: null,
    },
    resetPasswordTokenVerified:{
        type:Boolean,
        default:false
    },
    deviceToken:{
        type:String,
        require: true,
    }
    
},{
    timestamps:true
});

RetailerUsersSchema.methods.hashPassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10))
RetailerUsersSchema.methods.comparePassword = (password, hash)=> bcrypt.compareSync(password, hash)
RetailerUsersSchema.methods.createToken = (id)=> jwt.sign({
    user_id: id,
    time: Date.now()
  }, secretKey,{
      algorithm: "RS256"
  }
  );
RetailerUsersSchema.methods.verifyToken = (token)=> jwt.verify(token, publicKey, (err, data)=>{
    console.log("data",data, err)
    if(err) return {err: err};
    return {data: data};
});


const RetailerUsersModal = mongoose.model("RetailerUsers", RetailerUsersSchema);

module.exports = RetailerUsersModal;