const express = require("express");
const { register, login } = require("./user.routes");

const ApiRouter = express.Router()

ApiRouter.post("/register",register);
ApiRouter.post("/login",login)

module.exports={
    ApiRouter
}