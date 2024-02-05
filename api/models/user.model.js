import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        unique: true,
    }, 
    lastName:{
        type: String,
        required: true,
        unique: true,
    }, 
    username:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User;