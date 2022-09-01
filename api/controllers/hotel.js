import Hotel from "../models/Hotel.js";

export const createHotel = async (req, res, next) =>{
    const newHotel = new Hotel(req.body);
    try{
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    }
    catch(err){
        next(err);
    }
}

export const updateHotel = async (req, res, next) =>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateHotel);
    } catch (error) {
        next(err);
    }
}

export const deleteHotel = async (req, res, next) =>{
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteHotel);
    }
    catch(err){
        next(err);
    }
}

export const showHotel = async (req, res, next) =>{
    try {
        const findAll = await Hotel.find();
        res.status(200).json(findAll);
    } catch (error) {
        next(err);
    }
}
export const findHotel = async (req, res, next) =>{
    try{
        const findHotel = await Hotel.findById(req.params.id);
        res.status(200).json(findHotel);
    }
    catch(err){
        next(err)
    }
}