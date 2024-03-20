import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  image: {
    type: String
  },
  url: String,
  title: String,
  description: String,
  content: String
});

const Content = mongoose.model('Content', contentSchema);

export default Content;