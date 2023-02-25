import express from "express";
import cors from "cors";
import morgan from "morgan";
import options from "./cors.js";

const app = express()



app.disable("x-powered-by");
app.use(morgan("dev"))
app.use(cors(options));

export default app
