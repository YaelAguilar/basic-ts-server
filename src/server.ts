import express from "express";
import { Request, Response, NextFunction } from "express";
import { ExpressUserRouter } from "./lib/User/infrastructure/ExpressUserRouter";

const app = express();

app.use(express.json());

app.use(ExpressUserRouter);

// Middleware de manejo de errores corregido
app.use((err: unknown, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof Error) {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});