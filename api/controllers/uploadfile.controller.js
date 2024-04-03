import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

// Initialize GridFS storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO,
  file: (req, file) => {
    return {
      filename: file.originalname,
    };
  }
});
const upload = multer({ storage: storage });

// Handle file upload
const uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'File upload failed', error: err });
    }
    res.json({ success: true, message: 'File uploaded successfully' });
  });
};

export default { uploadFile };
