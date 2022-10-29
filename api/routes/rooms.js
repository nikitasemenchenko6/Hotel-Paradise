import express from 'express';
import { createRoom, deleteRoom, findRoom, getRoom, updateRoom, updateRoomAvailablisty } from '../controllers/room.js';
import {verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom)
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)
router.get("/all",verifyAdmin, getRoom);
router.get('/:id', verifyAdmin, findRoom);
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availablelity/:id', verifyAdmin, updateRoomAvailablisty);

export default router;