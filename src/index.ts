
import "./loadEnvironments.js"
import createDebug from "debug";
import chalk from "chalk";
import startServer from "./server/startServer.js";
import connectDatabase from "./database/connectDatabase.js";

const debug = createDebug("app");
const port = process.env.PORT ?? 4500;
const mongoDdUrl = process.env.MONGODB_CONNECTION_URL!;

try{
  await startServer(+port)
  debug(chalk.bgGreen(`Start with server 'http://localhost:${port}'`));

  await connectDatabase(mongoDdUrl);
  debug(chalk.bgGreen("Connected to data base"));
}catch(error){
  debug(chalk.bgRed(error.message));
}

