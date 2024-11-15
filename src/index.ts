import express from "express";
import { router as mainRouter } from "./routes/index"

const app = express();

app.use(express.json())
app.use("/api/v1", mainRouter);


app.listen(3000);