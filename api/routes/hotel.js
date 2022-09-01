import express from 'express';
import { createHotel, deleteHotel, findHotel, showHotel, updateHotel } from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';
const router = express.Router();
router.post('/', createHotel)
router.put('/:id', updateHotel)
router.delete('/:id', deleteHotel)
router.get('/', showHotel)
router.get('/find/:id', findHotel)

export default router;