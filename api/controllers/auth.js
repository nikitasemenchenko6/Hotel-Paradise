import Users from "../models/Users.js"
import bcrypt from 'bcrypt';

export const register = async (req, res, next) =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    try{
        const newUser = new Users({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        const savedUser = await newUser.save();
        res.status(201).send(savedUser)
    }catch(err){
        next(err)
    }
};