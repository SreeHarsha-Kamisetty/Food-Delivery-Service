const { OrderModel } = require("../models/orders.model")



const orderDetails = async(req,res)=>{
    try {
        let {id} = req.params;
        
        let details = await OrderModel.findOne({_id:id}).populate('user','-password').populate('restaurant')

        if(!details) return res.status(404).json({Error:"Order not found"})

        res.status(200).json(details)

    } catch (error) {
        res.status(500).json({Error:"Error while getting order details"})
    }
}

const updateOrderStatus = async(req,res)=>{
    try {
        let {status} = req.body
        let {id} = req.params;
        
        let details = await OrderModel.findOne({_id:id}).populate('user','-password').populate('restaurant')

        if(!details) return res.status(404).json({Error:"Order not found"})

        await OrderModel.findByIdAndUpdate({_id:id},{status:status})

        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({Error:"Error while updating order status"})
    }
}

const placeOrder = async(req,res)=>{
    try {
        let newOrder = new OrderModel(req.body);
        await newOrder.save();

        res.status(201).json({Message:"Order placed"})
    } catch (error) {
        res.status(500).json({Error:"Error while pacing order"})
    }
}

module.exports={
    orderDetails,updateOrderStatus,placeOrder
}



