import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    category: String,
    title: String,
    src: String,
    content: Object
});

const About = mongoose.model('About', contentSchema);

export default About;