const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require("path");
const { notify } = require('../routes/admin/login');
const { stringify } = require('querystring');
const Schema = mongoose.Schema;
const secretKey =  fs.readFileSync("./cert/private.pem")
const publicKey =  fs.readFileSync("./cert/public.pem")
console.log("publicKey", publicKey)
const PortfolioSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        require:true
    },
    token:[{
        type:String, 
    }],
    mode:{
        type:String,
        default:"dev",
        require: true, 
        min: 3,
        max:3
    },
    permitUrl:[{
        type:String,
        max: 500
    }],
    basicInfo:{
        name:{
            type:String,
            require:true,
            default:"Profile",
            min: 4,
            max: 50,
        },
        email:{
            type:String,
            // require:true,
            // min: 6,
            max: 100,
            default:null,
        },
        contact_no:[{
            type:String,
            // require:true,
            default:null,

            // min: 9,
            max: 20
        }],
        address:{
            type:String,
            default:null,
            max: 200
        },
        about_my_self:{
            type:String,
            default:null,
            max: 400
        },
        dob:{
            type:String,
            // require:true,
            max: 12
        },
        blackList:[{
            type:String,
            
        }]
    },
    skills: [{
        type:String,
        default:null,
        max: 50
    }],
    education:[{
        from:{
            type:String,
            require:true,
            max:200
        },
        started:{
            type:String,
            default:null,
            max: 12
        },
        ended:{
            type:String,
            default:null,
            max: 12
        },
        result:{
            type:String,
            default:null,
            max: 20
        }, 
        hide:{
            type:Boolean,
            default: false
        }
    }],
    experience:[{
        from:{
            type:String,
            require:true,
            max:200
        },
        started:{
            type:String,
            default:null,
            max: 12
        },
        ended:{
            type:String,
            default:null,
            max: 12
        },
        result:{
            type:String,
            default:null,
            max: 200
        },
        hide:{
            type:Boolean,
            default: false
        }
    }],
    projects:[{
        project_type:{
            type:String,
            max:100,
        },
        name:{
            type:String,
            require:true,
            max:50
        },
        link:{
            require:true,
            type:String
        },
        shot_description:{
            type:String,
            require:true,
            max:150
        },
        description:{
            type:String,
            require:true,
            max:500
        },
        hide:{
            type:Boolean,
            default: false
        }
    }],
    achievements:[{
        title:{
            type:String,
            require:true,
            max:150
        },
        description:{
            type:String,
            require:true,
            max:500
        },
        imageLink:{
        
            type:String,
            default:""
        },
        hide:{
            type:Boolean,
            default: false
        }
    }],
    othersLinks:[{
        title:{
            require:true,
            type:String,
            max: 50
        },
        link:{
            require:true,
            type:String,
        },
        hide:{
            type:Boolean,
            default: false
        }

    }],
    socialLinks:{
        github_link:{
            // require:true,
            default:null,
            type:String
        },
        facebook:{
            default:null,

            // require:true,
            type:String,
        },
        linkedin:{
            default:null,
            // require:true,
            type:String,
        },
        codeCafe:{
            default:null,
            // require:true,
            type:String,
        },
        blackList:[{
            type:String,
            
        }]
    }
},{timestamps:true});

PortfolioSchema.methods.createToken = (id)=> jwt.sign({
    Portfolio_id: id,
    time: Date.now()
  }, secretKey,{
      algorithm: "RS256"
  }
  );
PortfolioSchema.methods.verifyToken = (token)=> jwt.verify(token, publicKey, (err, data)=>{
    console.log("data",data, err)
    if(err) return {err: err};
    return {data: data};
});


const PortfolioModal = mongoose.model("Portfolios", PortfolioSchema);

module.exports = PortfolioModal;