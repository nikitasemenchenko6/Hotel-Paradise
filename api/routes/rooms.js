import express from 'express';
import { createRoom, findRoom, getRoom } from '../controllers/room.js';
import {verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();

router.post("/:hotelId", verifyAdmin, createRoom)
router.get("/all",verifyAdmin, getRoom);
router.get('/:id', verifyAdmin, findRoom);
export default router;