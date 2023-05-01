import app from "./app.js"
import connectDB from "./config/database.js"



//======= call connectDB funnction =========//
connectDB();










app.listen(process.env.PORT, () =>{
    console.log(`Server is working port on ${process.env.PORT}`)
})







