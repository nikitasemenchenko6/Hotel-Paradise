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
    const {min, max, ...others} = req.query;
    try {
        const findAll = await Hotel.find({
            ...others,
            cheapestPrice:{$gt:min || 1, $lt:max || 999},
        }).limit(req.query.limit);
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
export const countByCity = async(req, res, next) =>{
    const cities = req.query.cities.split(',');
    try{
        const countryList = await Promise.all(
            cities.map((city) =>{
                return Hotel.countDocuments({city:city});
            })
        );
        res.status(200).json(countryList)
    }
    catch(err){
        next(err)
    }
}
export const countByType = async (req, res, next) =>{
    try{
        const countHotel = await Hotel.countDocuments({type:'hotel'});
        const apartmentCount = await Hotel.countDocuments({type:'apartment'});
        const resortCount = await Hotel.countDocuments({type:'resort'});
        const villaCount = await Hotel.countDocuments({type:'villa'});
        const cabinCount = await Hotel.countDocuments({type:'cabin'});
        res.status(200).json([
            {type: 'hotel', count:countHotel},
            {type: 'apartment', count:apartmentCount},
            {type: 'resort', count:resortCount},
            {type: 'villa', count:villaCount},
            {type: 'cabin', count:cabinCount},
        ])
    }
    catch(err){
        next(err)
    }
}

export const getHotelRooms = async (req, res, next) =>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        const list = await Promise.all(
            hotel.rooms.map((room) =>{
                return Room.findById(room)
            })
        )
        res.status(200).json(list);
    }
    catch(err){
        next(err)
    }
}