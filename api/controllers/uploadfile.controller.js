// controllers/uploadController.js
import File from "../models/uploadfile.model.js";

export const uploadFile = async (req, res, next) => {
  try {
    const { filename, contentType, data } = req.file;
    const file = new File({
      filename,
      contentType,
      data,
    });
    await file.save();
    res.status(201).json({ success: true, file: { _id: file._id, filename, data, contentType } });
  } catch (error) {
    next(error);
  }
};
