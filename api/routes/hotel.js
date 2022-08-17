import express from 'express';
const router = express.Router();

//CREATE
//UPDATE
//DELETE
//GET
//GET ALL
router.post('/', async(req, res) =>{
    try{

    }
    catch(err){
        res.status(500).json(err)
    }
})

// router.get('/', (req, res) =>{
//     res.send("comming from hotels ")
// })
export default router;