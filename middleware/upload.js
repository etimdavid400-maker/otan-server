// server/middleware/upload.js
import multer from "multer";

// Store the file temporarily in memory (buffer) instead of disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;

