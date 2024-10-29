import * as outfitController from "../controllers/outfit-controller.js";
import express from "express";
const router = express.Router();

router.route("/").get(outfitController.getAll);
router.route("/:id");

export default router;
