import express from 'express';
const router = express.Router();

router.get("/", (req, res) =>{
    res.send("Get request from rooms router")
})

export default router;