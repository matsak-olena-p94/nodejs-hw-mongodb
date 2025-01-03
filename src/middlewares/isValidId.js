import { isValidObjectId } from "mongoose";
import createError from "http-errors";


export const isValidId = (req, res, next)=> {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        return next(createError(400, `This is not a valid id`));
    }
    next();
};