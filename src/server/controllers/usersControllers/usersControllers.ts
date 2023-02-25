import { type NextFunction, type Request, type Response } from "express";
import { type UserStructure } from "../../../types";
import bcryptjs from "bcryptjs";
import User from "../../../database/models/User.js";
import { CustomError } from "../../../CustomError/CustomError.js";

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;
    const { filename } = req.file!;

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.create({
      image: filename,
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({ user });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't create the user"
    );

    next(customError);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find().exec();

    res.status(200).json({ users });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't retrieve users"
    );

    next(customError);
  }
};
