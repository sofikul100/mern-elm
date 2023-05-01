import { catchAsyncError } from "../middlewares/catchAsyncErrors.js";

export const getCourses= catchAsyncError(async (req,res,next) =>{
      return res.json({
        message:'all courses here'
      })
});