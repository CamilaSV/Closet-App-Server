import "dotenv/config";
import fs from "fs";
import cors from "cors";
import express from "express";
import itemRoutes from "./routes/item-routes.js";

const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/item", itemRoutes);

app.get("/", (_req, res) => {
  res.sendStatus(200);
});

app.get("/uploads/:path", (req, res) => {
  const filePath = `./uploads/${req.params.path}`;

  if (!fs.existsSync(filePath)) {
    return res.status(404).send("File not found");
  }

  const fileExtension = filePath.split(".").pop();
  const contentType =
    fileExtension === "png" ? "image/png" : `image/${fileExtension}`;

  res.setHeader("Content-Type", contentType);
  fs.createReadStream(filePath).pipe(res);
});

app.listen(PORT, () => {
  console.log(BACKEND_URL + PORT + " running");
});
