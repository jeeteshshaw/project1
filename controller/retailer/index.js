const RetailersUserModal = require("../../models/Retailers/Users");
const StoreUserModal = require("../../models/Stores/Users");
const StoreModal = require("../../models/Stores/Store");
const {trimData} = require('../../common/common');

const RetailerLogin = async(req, res, next)=>{
    const {email , password} = req.body
    console.log("body",req.body);

    if(!email){
        return res.status(403).json({status:"failed", message:"Email is missing"})
    }
    if(!password){
        return res.status(403).json({status:"failed", message:"Password is missing"})
    }

    
    const user = await RetailersUserModal.findOne({email: email.toLowerCase()})
    console.log(user);

    if(!user){
        return res.status(401).send({status:"failed", message:"Wrong Email or Password"})
    }
    if(user.comparePassword(password,user.password)){
        
        let token = user.createToken(user._id)
        
        return res.status(200).send({status: "success", message:"Successfully Logged In", data: {token: token, name: user.name}})
    }
    return res.status(401).send({status:"failed", message:"Wrong Email or Password"})

}

const RetailerSignup = async (req, res, next)=>{
    const {email , password, name, phone, deviceToken, profile_image} = req.body
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

    const existEmail = await RetailersUserModal.findOne({email: email})
    console.log("existEmail",existEmail)
    if(existEmail){
        return res.status(403).send({status: "failed", message:"Email Already Exits"});
    }
    const existPhone = await RetailersUserModal.findOne({phone_number: phone})
    console.log("existPhone",existPhone)
    if(existPhone){
        return res.status(403).send({status: "failed", message:"Phone Number Already Exits"});
    }
    const newUser = new RetailersUserModal();
    newUser.name = name;
    newUser.password = newUser.hashPassword(password);
    newUser.email = email.toLowerCase();
    newUser.phone_number = phone;
    newUser.profile_image = profile_image
    newUser.deviceToken= deviceToken||""
    try {
        const userSaved = await newUser.save()
        console.log("userSaved",userSaved)
    
        if(!userSaved)
        return res.status(400).send({status: "failed", message:"Something went Wrong", data: userSaved});

        return res.send({status: "success", message:"Successfully Created New User", data: {token: newUser.createToken(newUser._id,"1234567890"), name: newUser.name}})
    } catch (error) {
        return res.status(400).send({status: "failed", message:"Something went Wrong", data: error});
        
    }
    
}



const StoreUserCreate = async (req, res, next)=>{
    const {email , password, name, phone, deviceToken, profile_image} = req.body
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

    const existEmail = await StoreUserModal.findOne({email: email})
    console.log("existEmail",existEmail)
    if(existEmail){
        return res.status(403).send({status: "failed", message:"Email Already Exits"});
    }
    const existPhone = await StoreUserModal.findOne({phone_number: phone})
    console.log("existPhone",existPhone)
    if(existPhone){
        return res.status(403).send({status: "failed", message:"Phone Number Already Exits"});
    }
    const newUser = new StoreUserModal();
    newUser.name = name;
    newUser.password = newUser.hashPassword(password);
    newUser.email = email.toLowerCase();
    newUser.phone_number = phone;
    newUser.profile_image = profile_image;
    newUser.deviceToken= ""
    try {
        const userSaved = await newUser.save()
        console.log("userSaved",userSaved)
    
        if(!userSaved)
        return res.status(400).send({status: "failed", message:"Something went Wrong", data: userSaved});

        return res.send({status: "success", message:"Successfully Created New User", data: {token: newUser.createToken(newUser._id,"1234567890"), name: newUser.name}})
    } catch (error) {
        return res.status(400).send({status: "failed", message:"Something went Wrong", data: error});
        
    }
}

// Controller to create a new store
const StoreCreate = async (req, res) => {
    try {
        const { 
            store_name, 
            store_description, 
            location, 
            location_coordinate, 
            store_image, 
            owner_name, 
            store_created_by 
        } = req.body;

        // Create a new store instance
        const newStore = new StoreModal({
            store_name,
            store_description,
            location,
            location_coordinate,
            store_image,
            owner_name,
            store_created_by
        });

        // Save the store to the database
        const savedStore = await newStore.save();

        // Respond with the saved store data
        res.status(201).json({
            message: 'Store created successfully!',
            store: savedStore
        });
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({
            message: 'Failed to create store',
            error: error.message
        });
    }
};



module.exports = {
    RetailerLogin,
    RetailerSignup,
    StoreUserCreate,
    StoreCreate
}