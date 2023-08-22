import File from "../models/File.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadImage = async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };

  try {
    const file = await File.create(fileData);
    res
      .status(200)
      .json({ path: `http://localhost:${process.env.PORT}/file/${file._id}` });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ error: error.message });
  }
};
