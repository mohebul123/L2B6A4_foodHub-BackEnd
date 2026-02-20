import express from "express";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors());

export default app;
