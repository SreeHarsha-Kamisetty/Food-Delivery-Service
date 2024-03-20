const { RestuarantModel } = require("../models/restaurant.model")


const newRestaurant = async(req,res)=>{
    try {
        let new_restaurant = new RestuarantModel(req.body);
        await new_restaurant.save();

        res.status(201).json({Message:"New restaurant added",new_restaurant});

    } catch (error) {
        res.status(500).json({Error:"Error while adding new restaurant"})
    }
}

const allRestraunts = async(req,res)=>{
    try {
        let details = await RestuarantModel.find();

        res.status(200).json({details})
    } catch (error) {
        res.status(500).json({Error:"Error when getting restuarant details"})
    }
}

const restaurantDetails = async(req,res)=>{
    try {
        let {id} = req.params;
        let details = await RestuarantModel.find({_id:id});

        res.status(200).json({details})
    } catch (error) {
        res.status(500).json({Error:"Error when getting restuarant details"})
    }
}


const additems = async(req,res)=>{
    try {
        let {id} = req.params

        let restaurant = await RestuarantModel.findOne({_id:id});

        if(!restaurant) return res.status(404).json({Error:"Restaurant not found"})

        let newItem = req.body

        await RestuarantModel.findByIdAndUpdate({_id:id},{$push:{menu:newItem}})

        res.status(201).json({Message:"Item added to menu"})

    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error while adding item to menu"})
    }
}

const menuItems = async(req,res)=>{
    try {
        let {id} = req.params

        let restaurant = await RestuarantModel.findOne({_id:id});

        if(!restaurant) return res.status(404).json({Error:"Restaurant not found"})

        let menu = restaurant.menu;
        

        res.status(200).json(menu)

    } catch (error) {
        
    }
}


const deleteItem = async(req,res)=>{
    try {
        let {id} = req.params
        let {item} = req.params
        let restaurant = await RestuarantModel.findOne({_id:id});

        if(!restaurant) return res.status(404).json({Error:"Restaurant not found"})

        

        await RestuarantModel.findByIdAndUpdate({_id:id},{$pull:{menu:{_id:item}}})

        res.status(202).json({Message:"Item removed from menu"})

    } catch (error) {
        console.log(error)
        res.status(500).json({Error:"Error while adding item to menu"})
    }
}

module.exports={
    newRestaurant,allRestraunts,restaurantDetails,additems,menuItems,deleteItem
}