import express from 'express';
import { createUser, deleteUser, findUsers, UpdateUser, viewUsers } from '../controllers/user.js';
const router = express.Router()

router.post('/create', createUser);
router.put('/update/:id', UpdateUser);
router.delete('/delete/:id', deleteUser);
router.get('/view', viewUsers);
router.get('/find/:id', findUsers);
export default router;
