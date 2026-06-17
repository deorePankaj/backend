import express, { json } from "express";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(json());
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({
    message: "Real Estate API is running 1",
  });
});

export default app;
