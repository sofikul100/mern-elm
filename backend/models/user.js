import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: validator.isEmail
    },
    password:{
        type:String,
        required:[true,'Please enter your password'],
        minLength:[6,'Password must be at least 6 characters'],
        select:false
    },
    role:{
        type:String,
        enump:["admin","user"],
        default:"user"
    },
    subscription:{
        id:String,
        status:String
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    playlist:[
        {
            course:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//hasing password//
schema.pre("save",async function (next){
     if(!this.isModified("password")) return next();
     this.password = await bcrypt.hash(this.password,10)
     next();
});

//generating jwt token//

schema.methods.getJWTtoken = function () {
   return jwt.sign({_id:this._id},process.env.JWT_SECRET,{
    expiresIn:"15d"
   });
};


//compare password//

schema.methods.comparePassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword,this.password);
};





















export default mongoose.model("User",schema)