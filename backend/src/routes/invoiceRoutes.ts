import express from "express";
import { generatePdf } from "../controllers/generatePdf";

const router = express.Router();

router.post("/generate-pdf",generatePdf)


export default router;