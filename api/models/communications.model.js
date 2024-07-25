import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  messages: [
    {
      id: String,
      message: String,
      sentAt: Date,
      firstName: String,
      photoURL: String,
      user: String,
      edit: Boolean,
      read: Boolean,
      replies: [
        {
          id: String,
          message: String,
          photoURL: String,
          firstName: String,
          sentAt: Date,
          user: String,
          edit: Boolean,
          read: Boolean,
        },
      ],
    },
  ],
  user: [
    {
      firstName: String,
      photoURL: String,
    },
  ],
  reactions: String,
}, { timestamps: true });

const Communication = mongoose.model('Communication', contentSchema);

export default Communication;
