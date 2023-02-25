import { Router } from "express";
import multer from "multer"
import uniqid from "uniqid"
import { createUser } from "../../controllers/usersControllers/usersControllers";

const usersRouter = Router();

const storage = multer.diskStorage({
  destination(req,res,callback){
    callback(null, "src/uploads/");
  },
  filename(req,file,callback){
    callback(null, uniqid(`${file.fieldname}-`, `-${file.originalname}`));
  }
})
const upload = multer({storage})

usersRouter.post("/register", upload.single("image"), createUser)
