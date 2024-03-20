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
module.exports={
    newRestaurant,allRestraunts,restaurantDetails
}