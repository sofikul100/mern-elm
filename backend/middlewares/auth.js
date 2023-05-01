import ErrorHanler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { catchAsyncError } from "./catchAsyncErrors.js";
import User from "../models/user.js";

export const isAuthenticatedUser = catchAsyncError(async(req,res,next) =>{
     const {token} = req.cookies;
     if(!token) return next(new ErrorHanler("Please login to access the resource",400))


     const decodedata = jwt.verify(token, process.env.JWT_SECRET);

     req.user = await User.findById(decodedata._id);
     next();
});



export const authorizeAdmin =(req,res,next) =>{
   if(req.user.role != "admin"){
      return next(new ErrorHanler("you can not access this resource.. access only admin",403))
   }
   next();
}