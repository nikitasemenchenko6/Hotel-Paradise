import Rooms from "../models/Rooms.js";
import Hotel from '../models/Hotel.js';

export const createRoom = async (req, res, next) =>{
    const hotelId = req.params.hotelId ; 
    const newRoom = new Rooms(req.body)

    try{
        const savedRoom = await newRoom.save();
        try{
            await Hotel.findByIdAndUpdate(hotelId, 
                {$push:{rooms: savedRoom._id},
            })
        }
        catch(err){
            next(err)
        }
        res.status(200).json(savedRoom);
    }
    catch(err){
        next(err)
    }
}
export const deleteRoom = async(req, res, next) =>{
    const hotelId = req.params.hotelId;
    try{
        await Rooms.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId, {$pull:{rooms: req.params.id}})
        }
        catch(err){
            next(err)
        }
        res.status(201).json("Room Has been deleted")
    }
    catch(err){
        nexdt(err)
    }

}
export const updateRoom = async (req, res, next) =>{
    try{
        const getRoomUpadate = await Rooms.findByIdAndUpdate(req.params.id, {$set: req.body},{new: true})
        res.status(200).json(getRoomUpadate);
    }
    catch(err){
        next(err)
    }
}
export const getRoom = async (req, res, next) =>{
    try{
        const rooms = await Rooms.find();
        res.status(200).json(rooms);
    }
    catch(err){
        next(err);
    }
}
export const findRoom = async(req, res, next) =>{
    try{
        const room = await Rooms.findById(req.params.id);
        res.status(200).json(room);
    }
    catch(err){
        next(err)
    }
}