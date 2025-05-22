import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/DB.js";
import authRoutes from "./route/auth.routes.js"
import donationRoutes from "./route/donation.routes.js"
import userRoutes from "./route/user.routes.js"
import locationRoutes from "./route/location.routes.js"
dotenv.config();

const app = express();

dbConnect();
app.use(cors());
app.use(cors({
    origin: "https://platesforall.onrender.com:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/donation',donationRoutes)
app.use('/user',userRoutes);
app.use('/location',locationRoutes);
// app.use(urlEncoded());
dbConnect();
const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log("Server running at port : ",PORT);
})


