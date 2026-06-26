import express from "express";
import "dotenv/config";
import cors from "cors";

import type { Express, Request, Response, NextFunction } from "express";

import router from "./routes/routes.ts";

const PORT: number = parseInt(process.env.PORT || "8000", 10);

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  console.log("[ %s ]> %s", req.method, req.url);

  res.on("finish", (): void => {
    console.log("[ %s ]> %d -> %s", req.method, res.statusCode, req.url);
  });

  next();
});

app.use("/", router);

async function start(): Promise<void> {
  try {
    app.listen(PORT, (): void => {
      console.log("[ INFO ]> Server listening on %d", PORT);
    });
  } catch (error: Error | unknown) {
    console.error(
      "[ ERROR ]> An error occured: %s",
      error instanceof Error ? error.message : error,
    );
  }
}

start();
