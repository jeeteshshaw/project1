const { CreateBlankPortFolio, GetPortfolioDataById } = require("../../../controller/main/PortfolioController");
const PortfolioModal = require("../../../models/PortfolioModal");
const UserModal = require("../../../models/Users");

const Route = require("express").Router();

Route.get("/create", CreateBlankPortFolio);

Route.get("/:id", GetPortfolioDataById);

// name:{
//     type:String,
//     require:true,
//     default:"Profile",
//     min: 4,
//     max: 50,
// },
// email:{
//     type:String,
//     // require:true,
//     // min: 6,
//     max: 100,
//     default:null,
// },
// contact_no:[{
//     type:String,
//     // require:true,
//     default:null,

//     // min: 9,
//     max: 20
// }],
// address:{
//     type:String,
//     default:null,
//     max: 200
// },
// about_my_self:{
//     type:String,
//     default:null,
//     max: 400
// },
// dob:{
//     type:String,
//     // require:true,
//     max: 12
// },
// blackList:[{
//     type:String,
    
// }]

Route.post("update/basic", async(req, res, next)=>{
    const {portfolio_id, name, email, phone, address, about_my_self, dob, notShow }= req.body;
    if(!portfolio_id)
    return res.status(404).send({status:"failed", message: "Portfoilo not Found", data:null})
    try {
        const portfolioData = await PortfolioModal.findById(portfolio_id);
        if(portfolioData.user_id !== req.headers._id)
        return res.status(403).send({status:"failed", message: "Access Denied", data:null})
       
        portfolioData.basicInfo.name = name;
        portfolioData.basicInfo.email = eamil;
        portfolioData.basicInfo.address = address;
        portfolioData.basicInfo.contact_no = phone;
        portfolioData.basicInfo.dob = dob;
        portfolioData.basicInfo.about_my_self = about_my_self;
        portfolioData.basicInfo.blackList = notShow.split(',').map(item => item.trim());
        
        const saveNewData = await portfolioData.save()
        if(saveNewData){
            return res.status(200).send({status:"success", message: "Portfoilo Update Successfully", data:saveNewData})

        }
        else{
            return res.status(400).send({status:"failed", message: "Portfoilo not Found", data:null})

        }
        
        
    } catch (error) {
        return res.status(404).send({status:"failed", message: "Portfoilo not Found", data:null})
    }

})

module.exports = Route