import mongoose, { trusted } from "mongoose";

const locationSchema = new mongoose.Schema({
    "Name" : {
        type : String,
        required : true
    },
    "category" : {
        type : String,
        required : true
    },
    "latitude" : {
        type :String,
        required : false
    },
    "longitude" : {
        type : String,
        required : false
    },
    "address" : {
        type: String,
        required : true
    }
    
},{timestamps : true})

const Location = mongoose.model('LOCATION' , locationSchema)

export default Location;