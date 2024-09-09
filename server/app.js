import express from "express";
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv"

dotenv.config({
    path: "./.env",
})
const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000 ;

connectDB(mongoURI);

const app = express();

app.use(express.json());


app.use("/", userRoute)
 

app.get("/", (req, res)=>{
    res.send("Hello world")
})

app.listen(port, () => {
    console.log(`server is started on port ${port}`)
})