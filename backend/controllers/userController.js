import User from "../models/user.js"
import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js"
import { sendToken } from "../utils/sendToken.js";
export const register = catchAsyncError(async (req, res, next) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400))
    }


    const checkUser = await User.findOne({ email });

    if (checkUser) return next(new ErrorHandler("Email already exits", 400))


    const user = await User.create({
            name,
            email,
            password,
            avatar:{
                public_id:'public id',
                url:"url"
            }
        })
    //======== store token in cookie===========//
    sendToken(res,user,`Successfully registered`,200)

    
});



export const login = catchAsyncError(async (req,res,next) =>{
     const {email,password} = req.body;

     if(!email || !password){
        return next(new ErrorHandler("Please enter all fields.",400))
     }

     const user = await User.findOne({email}).select("+password");
     if(!user){
        return next(new ErrorHandler('Email and Password does not match',400));
     }

     const isMatch = await user.comparePassword(password);

     if(!isMatch){
        return next(new ErrorHandler("Email and Password does not match..",400))
     }
    //======== store token in cookie===========//
    sendToken(res,user,`Welcome back ${user.name}`,200)
});





export const logout = catchAsyncError (async (req,res,next) =>{
     res.status(200).cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:false
     }).json({
        success:true,
        message:"Successfully logout"
     });
});