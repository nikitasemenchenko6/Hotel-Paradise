import express from 'express';
import { createRoom, deleteRoom, findRoom, getRoom, updateRoom } from '../controllers/room.js';
import {verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom)
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)
router.get("/all",verifyAdmin, getRoom);
router.get('/:id', verifyAdmin, findRoom);
router.put('/:id', verifyAdmin, updateRoom);
export default router;