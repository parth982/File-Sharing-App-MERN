import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
app.use(cors());
app.use(express.urlencoded({ extended: true }));
import DBConnection from "./database/DBConnect.js";
import router from "./routes/routes.js";

app.use("/", router);

// DATABASE CONNECT -> START SERVER
const PORT = process.env.PORT || 5000;
DBConnection()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err.message} has occured`));
