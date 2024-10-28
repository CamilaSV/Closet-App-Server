import * as itemController from "../controllers/item-controller.js";
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
    const extension = file.originalname.split('.').pop(); 
    cb(null, `${timestamp}.${extension}`); 
  },
});

const upload = multer({ storage });

router
  .route("/")
  .get(itemController.getAll)
  .post(upload.single("image"), itemController.addItem);
router
  .route("/:id")
  .get(itemController.getOne)
  .patch(upload.single("image"), itemController.updateItem)
  .delete(itemController.deleteItem);

export default router;
