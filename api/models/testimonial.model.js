import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  name: String,
  url: String,
  testimonial: String
});

const Content = mongoose.model('Testimonial', contentSchema);

export default Content;