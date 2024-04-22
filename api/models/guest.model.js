import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
   name:{
        type: String,
        required: false,
    }, 
    recruiter:{
        type: Boolean,
    }
}, {timestamps: true})

const GuestUser = mongoose.model('GuestUser', guestSchema);

export default GuestUser;