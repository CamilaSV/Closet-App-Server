import * as rbController from "../controllers/rb-controller.js";
import fs from "fs";
import multer from "multer";
import express from "express";
const router = express.Router();

const uploadDirectory = "uploads";
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = file.originalname.split(".").pop();
    cb(null, `${timestamp}.${extension}`);
  },
});

const upload = multer({ storage });

router.route("/").post(upload.single("image"), rbController.removeBackground);

export default router;
