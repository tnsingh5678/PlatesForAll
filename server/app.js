import express from express;
import cors from cors;
import dotenv from "dotenv";
import dbConnect from "./config/DB";
dotenv.config();

const app = express();

dbConnect();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(urlEncoded());


