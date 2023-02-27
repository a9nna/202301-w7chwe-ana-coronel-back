import bcryptjs from "bcryptjs";
import { createClient } from "@supabase/supabase-js";
import fs from "fs/promises"
import { type NextFunction, type Request, type Response } from "express";
import { type UserStructure } from "../../../types";
import User from "../../../database/models/User.js";
import { CustomError } from "../../../CustomError/CustomError.js";
import path from "path";

export const createUser = async (
  req: Request<Record<string, unknown>, Record<string, unknown>, UserStructure>,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const userData = req.body;
    const imageName = req.file?.filename;

    const hashedPassword = await bcryptjs.hash(userData.password, 10);

    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_KEY!;
    const supabaseBucket = process.env.SUPABASE_BUCKET_NAME!;

    const supabase = createClient(
      supabaseUrl,
      supabaseKey
    );

    const image = await fs.readFile(path.join("src/uploads", imageName!))
    await supabase.storage.from(supabaseBucket).upload(imageName!, image)

    const {data:{publicUrl},} = supabase.storage.from(supabaseBucket).getPublicUrl(imageName!);

    const user = await User.create({
      ...userData,
      password: hashedPassword,
      image: imageName,
      backupImage: publicUrl
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
