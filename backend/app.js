import express from "express"
import dotenv from "dotenv";
import ErrorMiddleware from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

//========configure dotenv=========//

dotenv.config({
    path:"./config/config.env"
})


const app = express();


//========== using middleware =========//
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));




//========== imports all routes===========//
import userRoutes from "./routes/userRoute.js";
import courseRoutes from "./routes/courseRoute.js"



//======= use all routes=========//
app.use("/api/v1",userRoutes);
app.use("/api/v1/",courseRoutes);



export default app;

//========== use middleware ========//
app.use(ErrorMiddleware)