const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config()


const { UserModel } = require("../models/user.model");

const register = async(req,res)=>{
    try {
        let {email,password} = req.body;

        let user = await UserModel.findOne({email:email})

        if(user) return res.status(403).json({Error:"User already registered"})

        let hashedPassword = await bcrypt.hash(password,7);

        req.body.password = hashedPassword

        let newUser = new UserModel(req.body)
        await newUser.save();

        res.status(201).json({Message:"User registered"})
    } catch (error) {
        res.status(500).json({Error:"Error while registering"})
    }
}

const login = async(req,res)=>{
    try {
        let {email,password} = req.body

        let user = await UserModel.findOne({email:email})

        if(!user) return res.status(404).json({Error:"User not found. Please register"})

        let result = await bcrypt.compare(password, user.password)

        if(!result) return res.status(401).json({Error:"Incorrect credentials"})

        let token_payload = {userId:user._id,name:user.name};
        let secret_key = process.env.SECRETKEY

        let access_token = jwt.sign(token_payload, secret_key);

        res.status(201).json({Message:"Login successful",access_token});
    } catch (error) {
        
    }
}

module.exports={
    register,login
}