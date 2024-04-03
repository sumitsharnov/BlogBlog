import express from 'express';
import uploadController from '../controllers/uploadfile.controller.js';

const router = express.Router();

// Upload endpoint
router.post('/', uploadController.uploadFile);

export default router;
