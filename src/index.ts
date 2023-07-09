import express, { Application } from "express";
import config from "config";

import usersRouter from "./routs/users";
import postsRouter from "./routs/posts";
import { setupDb } from "./db/setup-db";

const port = config.get("port") as number;

setupDb();

const app: Application = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
