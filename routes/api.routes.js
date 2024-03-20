const express = require("express");
const { register, login, passwordReset } = require("./user.routes");

const ApiRouter = express.Router()

ApiRouter.post("/register",register);
ApiRouter.post("/login",login)
ApiRouter.patch("/user/:id/reset",passwordReset)
module.exports={
    ApiRouter
}