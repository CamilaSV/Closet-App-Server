import "dotenv/config";
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

app.listen(PORT, () => {
  console.log(BACKEND_URL + PORT + " running");
});
