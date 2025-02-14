import mongoose from "mongoose"

const DonationSchema = new Schema({
    food:{
        type: String,
        required: true
    },
    expiryDate:{
        type: Date,
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
        ref: 'USER',
        required: true
    },
    Volunteer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
        required: false
    },
    Address:{
        type: String,
        required: true
    },
    Latitude:{
        type: Number,
        required: true,
        default : 0
    },
    Longitude:{
        type: Number,
        required: true,
        default : 0
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
