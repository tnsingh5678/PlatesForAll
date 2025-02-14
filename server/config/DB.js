import mongoose from "mongoose"

const dbConnect = async ()=>{ mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>{
    console.log("Error while connecting to database : " ,error);
})
}

export default dbConnect;



