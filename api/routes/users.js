import express from 'express';
import { deleteUser, findUsers, UpdateUser, viewUsers } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';
const router = express.Router()

router.get("/checkauthentication", verifyToken, (req, res, next) =>{
    res.send("Your are Logged In")
})
router.get("/checkuser/:id", verifyUser, (req, res, next) =>{
    res.send("You are logged in and can delete User has been")
})

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) =>{
    res.send("You are admin can and can delete User has been")
})
router.put('/update/:id', UpdateUser);
router.delete('/delete/:id', deleteUser);
router.get('/view', viewUsers);
router.get('/find/:id', findUsers);
export default router;
