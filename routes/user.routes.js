const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
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

module.exports={
    register
}