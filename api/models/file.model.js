// models/File.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  uploadDate: { type: Date, default: Date.now },
  metadata: { type: String}
});

const File = mongoose.model("File", fileSchema);

export default File;
