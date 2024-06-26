const express = require("express");
const { register, login, passwordReset } = require("./user.routes");
const { newRestaurant, allRestraunts, restaurantDetails, additems, menuItems, deleteItem } = require("./restaurant.routes");
const { placeOrder, orderDetails, updateOrderStatus } = require("./order.routes");

const ApiRouter = express.Router()

// User routes
ApiRouter.post("/register",register);
ApiRouter.post("/login",login)
ApiRouter.patch("/user/:id/reset",passwordReset)

// Restuarant routes

ApiRouter.post("/restaurants",newRestaurant)
ApiRouter.get("/restaurants",allRestraunts)
ApiRouter.get("/restaurants/:id",restaurantDetails)

ApiRouter.post("/restaurants/:id/menu",additems)
ApiRouter.get("/restaurants/:id/menu",menuItems)
ApiRouter.delete("/restaurants/:id/menu/:item",deleteItem)

// Order routes

ApiRouter.post("/orders",placeOrder)
ApiRouter.get("/orders/:id",orderDetails)
ApiRouter.patch("/orders/:id",updateOrderStatus)

module.exports={
    ApiRouter
}