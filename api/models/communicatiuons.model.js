import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  messages: Array,
  user: Array,
  reactions: String,
  id: String
}, {timestamps: true});

const Communication = mongoose.model('Communication', contentSchema);

export default Communication;