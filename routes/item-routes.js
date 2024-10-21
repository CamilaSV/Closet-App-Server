import * as itemController from "../controllers/item-controller.js";
import express from "express";
const router = express.Router();

router.route("/").get(itemController.getAll).post(itemController.addItem);
router.route("/:id").get(itemController.getOne).patch(itemController.updateItem).delete(itemController.deleteItem);

export default router;
