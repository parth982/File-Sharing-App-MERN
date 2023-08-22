import File from "../models/File.js";
import dotenv from "dotenv";

dotenv.config();

export const getImage = async (req, res) => {
  try {
    const file = await File.findById(req.params.fileId);
    file.downloadCount++;
    await file.save();
    res.download(file.path, file.originalName);
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ msg: error.message });
  }
};
