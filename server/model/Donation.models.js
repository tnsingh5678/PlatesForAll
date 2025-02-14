import mongoose from "mongoose"

const DonationSchema = new mongoose.Schema({
    food:{
        type: String,
        required: true
    },
    expiryDate:{
        type: String,
        required: true
    },
    time:{
        type: Date,
        default: Date.now(),
        required: true
    },
    category:{
        type: [String],
        required: false
    },
    Donor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DUSER',
        required: true
    },
    Volunteer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DUSER",
        required: false
    },
    Address:{
        type: String,
        required: true
    },
    Latitude:{
        type: String,
        required: true,
        default : '0'
    },
    Longitude:{
        type: String,
        required: true,
        default : '0'
    },
    Status:{
        type: Boolean,
        required: true
    }
},{
    timestamps: true
});

const Donation = mongoose.model('DONATION',DonationSchema);
export default Donation;
