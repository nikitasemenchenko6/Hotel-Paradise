import express from 'express';
const router = express.Router()

router.get('/', (req, res) =>{
    res.send("comming message from users")
})
export default router;
