import express from "express";
import upload from "../utils/upload.js";
import { uploadImage } from "../controller/upload_cntr.js";
import { getImage } from "../controller/download_cntr.js";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadImage);
router.get("/file/:fileId", getImage);

export default router;
