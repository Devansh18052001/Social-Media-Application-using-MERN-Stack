import express from 'express';
import multer from 'multer';
// Declare Router for uploading Post of multimedia type
const router = express.Router();
// For Storing images in localStorage/ as cbm
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  //  middleware for handling multipart/form-data , which is primarily used for uploading files
const upload = multer({ storage: storage });

// Middleware provided by multer
router.post("/", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });

export default router