import express from 'express';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';
const router = express.Router();

router.post('/', async(req, res) =>{
    const newHotel = new Hotel(req.body);
    try{
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    }
    catch(err){
        res.status(500).json(err)
    }
})
router.put('/:id', async(req, res) =>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updateHotel);
    } catch (error) {
        res.status(500).json(error);
    }
})
router.delete('/:id', async(req, res) =>{
    try{
        const deleteHotel = await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json(deleteHotel);
    }
    catch(err){
        res.status(500).json(err)
    }
})
router.get('/', async(req, res) =>{
    try {
        const findAll = await Hotel.find();
        res.status(200).json(findAll);
    } catch (error) {
        res.status(500).json(error);
        
    }
})
router.get('/find/:id', async(req, res, next) =>{
    try{
        const findHotel = await Hotel.findById(req.params.id);
        res.status(200).json(findHotel);
    }
    catch(err){
        next(err)
    }
})

export default router;