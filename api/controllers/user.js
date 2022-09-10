import Users from "../models/Users.js"

export const createUser = async (req, res, next) =>{
    const newUser = new Users(req.body);
    try{
        const saveUser = await newUser.save();
        res.status(201).send(saveUser);
    }catch(err){
        next(err)
    }
}

export const UpdateUser = async(req, res, next) =>{
    try{
        const updateUser = await Users.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).send(updateUser);
    }
    catch(err){
        next(err)
    }
}
export const deleteUser = async(req, res, next) =>{
    try{
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).send("successfully Deleted");
    }
    catch(err){
        next(err)
    }
}
export const viewUsers = async(req, res, next) =>{
    try{
        const viewUsers = await Users.find();
        res.status(200).send(viewUsers);
    }
    catch(err){
        next(err)
    }
}
export const findUsers = async(req, res, next) =>{
    try{
        const findUser = await Users.findById(req.params.id);
        res.status(200).send(findUser);
    }
    catch(err){
        next(err)
    }
}