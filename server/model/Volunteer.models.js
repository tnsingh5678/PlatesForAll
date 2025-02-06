import mongoose from "mongoose"

const VolunteerSchema = new Schema({
    food:{
        type: String,
        required: true
    },
    User:{
        type: Schema.Types.ObjectId,
        ref: "USER"
    },
    Address:{
        type: String,
        required: true,
    }
},{
    timestamps: true
});

const Volunteer = mongoose.model('VOLUNTEER',VolunteerSchema);