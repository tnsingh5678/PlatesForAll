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
    Volunteer:{
        type: Schema.Types.ObjectId,
        ref: "VOLUNTEER"
    },
    Address:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Donation = mongoose.model('DONATION',DonationSchema);
export default Donation;
