import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    latitude:{
        type: String,
        required: true,
        default: 0
    },
    longitude:{
        type: String,
        required: true,
        default: 0
    },
    donations:{
        type: [mongoose.Schema.Types.ObjectId],
        ref : 'DONATION',
        required: false
    },
    volunteering:{
        type: [mongoose.Schema.Types.ObjectId],
        required: false
    }

},{
    timestamps: true
});

const User = mongoose.model('DUSER',UserSchema);

export default User;