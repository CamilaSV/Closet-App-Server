import * as itemController from "../controllers/item-controller.js";
import express from "express";
const router = express.Router();

router.route("/").get(itemController.all);

export default router;
