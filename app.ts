import 'reflect-metadata';
import './src/infra/container';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from "express";
import { router } from "./src/application/routes";

const app = express();
app.use(express.json());

app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    error: err,
    message: err.message
  })
});

app.listen(8080, () => {
    console.log("App started on port 8080");
});