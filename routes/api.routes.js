const express = require("express");
const { register } = require("./user.routes");

const ApiRouter = express.Router()

ApiRouter.post("/register",register);


module.exports={
    ApiRouter
}