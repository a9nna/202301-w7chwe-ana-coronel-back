import express from "express";
import cors from "cors";
import morgan from "morgan";
import options from "./cors.js";
import { usersRouter } from "./routers/usersRouters/usersRouters.js";

const app = express()



app.disable("x-powered-by");
app.use(morgan("dev"))
app.use(cors(options));

app.use("/users", usersRouter)

export default app
