import "dotenv/config";
import cors from "cors";
import express from "express";

const PORT = process.env.PORT;
const BACKEND_URL = process.env.BACKEND_URL;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(BACKEND_URL + PORT + " running");
});
