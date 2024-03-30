import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  name: String,
  skills: String,
  overview: String,
  image: String
});

const Certification = mongoose.model('Certification', contentSchema);

export default Certification;