import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  messages: Array,
  user: String,
  replies: Array,
  reactions: String,
}, {timestamps: true});

const Communication = mongoose.model('Communication', contentSchema);

export default Communication;