// controllers/downloadController.js
import File from "../models/file.model.js";

export const downloadFile = async (req, res, next) => {
    try {
      const fileId = req.params.fileId;
      const file = await File.findById(fileId);
  
      if (!file) {
        return res.status(404).json({ success: false, message: "File not found" });
      }
  
      res.setHeader("Content-Disposition", `attachment; filename=${file.filename}`);
  
      if (file.contentType) {
        res.setHeader("Content-Type", file.contentType);
      }
  
      res.send(file.data);
    } catch (error) {
      next(error);
    }
  };