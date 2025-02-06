import mongoose from "mongoose"

const dbConnect = ()=>{ mongoose.connect(process.env.MONOG_URL).then(()=>{
    console.log("Database connected successfully")
}).catch((error)=>{
    console.log("Error while connecting to database : " ,error);
})
}

export default dbConnect;



