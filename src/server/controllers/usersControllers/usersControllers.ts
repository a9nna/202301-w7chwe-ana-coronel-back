import { type NextFunction, type Request, type Response } from "express"
import { type UserStructure } from "../../../types"
import bcryptjs from "bcryptjs";
import User from "../../../database/models/User";
import { CustomError } from "../../../CustomError/CustomError";

export const createUser = async (
  req: Request<Record<string, unknown>,Record<string, unknown>,UserStructure>, 
  res: Response, 
  next: NextFunction
) => {
  try{
    const {email, password, username} = req.body;
    const { filename } = req.file!;

    const hashedPassword = await bcryptjs.hash(password,10);

    const user = await User.create({
      image: filename,
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({user});
  }catch ( error ) {
    const customError = new CustomError((error as Error).message, 500, "Couldn't create the user");

    next(customError)
  }
}
