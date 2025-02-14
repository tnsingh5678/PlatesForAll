import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/DB.js";
import authRoutes from "./route/auth.routes.js"
import donationRoutes from "./route/donation.routes.js"
dotenv.config();

const app = express();

dbConnect();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));
app.use(express.json());

app.use('/auth',authRoutes);
app.use('/donation',donationRoutes)
// app.use(urlEncoded());
dbConnect();
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("Server running at port : ",PORT);
})


