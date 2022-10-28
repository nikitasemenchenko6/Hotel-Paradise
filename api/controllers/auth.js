import Users from "../models/Users.js"
import bcrypt from 'bcrypt';
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'

let sshkey = "W16aQUoCDwHm8AAAAadWpqYWx6YW1hbkBERVNLVE9QLUlLNkVITkUB"
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
        res.status(201).json(savedUser)
    }catch(err){
        next(err)
    }
};

export const Login = async (req, res, next) =>{
    try{
        const user = await Users.findOne({username: req.body.username});
        if(!user) return next(createError(404, "User Not Found"))

        const isPassword = await bcrypt.compare(req.body.password, user.password)
        if(!isPassword) return next(createError(404, "Password  Not match"))

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, sshkey)
        const {password, isAdmin, ...others} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true
        })
        .status(200)
        .json({details: {...others}, isAdmin})
    }
    catch(err){
        console.log(err)
    }

}