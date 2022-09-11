import { createError } from "./error.js";
import jwt from 'jsonwebtoken';

let sshkey = "W16aQUoCDwHm8AAAAadWpqYWx6YW1hbkBERVNLVE9QLUlLNkVITkUB"
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You Are Not Authenticated!"))
    jwt.verify(token, sshkey, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.user = user;
        next();
    })

}

export const verifyUser = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        }
        else{
            if(err) return next(createError(403, "You are not authorised"))
        }
    })
}

export const verifyAdmin = (req, res, next) =>{
    verifyToken(req, res, () =>{
        if(req.user.id === req.user.isAdmin){
            next();
        }
        else{
            if(err) return next(createError(403, "You are not authorised"))
        }
    })
}