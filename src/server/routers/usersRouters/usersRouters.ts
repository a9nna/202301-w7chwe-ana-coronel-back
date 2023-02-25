import { Router } from "express";
import multer from "multer"
import uniqid from "uniqid"
import { createUser } from "../../controllers/usersControllers/usersControllers.js";

export const usersRouter = Router();

const storage =
  process.env.NODE_ENV === "test"
    ? multer.memoryStorage()
    : multer.diskStorage({
        destination(req, res, callback) {
          callback(null, "src/uploads/");
        },
        filename(req, file, callback) {
          callback(null, uniqid(`${file.fieldname}-`, `-${file.originalname}`));
        },
      });
const upload = multer({storage, limits: {fileSize: 8000000}})

usersRouter.post("/register", upload.single("image"), createUser)

