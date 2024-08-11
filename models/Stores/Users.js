const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const Schema = mongoose.Schema;
const secretKey =  fs.readFileSync("./cert/private.pem")
const publicKey =  fs.readFileSync("./cert/public.pem")

const StoreUserSchema = new Schema({
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
        require: true,
        // default: null,
    },
    resetPasswordToken:{
        type:String,
        default: null,
    },
    resetPasswordTokenVerified:{
        type:Boolean,
        default:false
    },
    device_token:{
        type:String,
        require: true,
        default:"",
        unique:true
    },
    store_id: {
        type: [Schema.Types.ObjectId],
        ref: "Stores",
        default: [],
    }
   
},{
    timestamps:true
});

StoreUserSchema.methods.hashPassword = (password)=> bcrypt.hashSync(password, bcrypt.genSaltSync(10))
StoreUserSchema.methods.comparePassword = (password, hash)=> bcrypt.compareSync(password, hash)
StoreUserSchema.methods.createToken = (id)=> jwt.sign({
    user_id: id,
    time: Date.now()
  }, secretKey,{
      algorithm: "RS256"
  }
);
StoreUserSchema.methods.verifyToken = (token)=> jwt.verify(token, publicKey, (err, data)=>{
    console.log("data",data, err)
    if(err) return {err: err};
    return {data: data};
});


const StoreUserModal = mongoose.model("StoreUsers", StoreUserSchema);

module.exports = StoreUserModal;