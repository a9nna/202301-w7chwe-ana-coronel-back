import { Router } from "express";
import multer from "multer";
import crypto from "crypto"
import path from "path";
import {
  createUser,
  getUsers,
} from "../../controllers/usersControllers/usersControllers.js";

export const usersRouter = Router();

const storage =
  process.env.NODE_ENV === "test"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination(req, res, callback) {
          callback(null, "src/uploads/");
        },
        filename(req, file, callback) {
          const unicReference = crypto.randomUUID();
          const extension = path.extname(file.originalname);
          const basename = path.basename(file.originalname, extension);
          const filename = `${basename}-${unicReference}${extension}`
          callback(null, filename);
        },
      });
      
const upload = multer({ storage, limits: { fileSize: 8000000 }});

usersRouter.post("/register", upload.single("image"), createUser);
usersRouter.get("/", getUsers);
