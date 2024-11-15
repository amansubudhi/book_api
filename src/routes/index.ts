import express from "express";
import { router as authorRouter } from "./author"
import { router as categoryRouter } from "./category"
import { router as bookRouter } from "./book"

export const router = express.Router();

router.use("/author", authorRouter);
router.use("/categories", categoryRouter);
router.use("/books", bookRouter);
