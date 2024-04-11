import express from "express";
import cors from "cors";
import { router } from "./routes/route.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.listen("1100", () => {
  console.log("Server Running!");
});
