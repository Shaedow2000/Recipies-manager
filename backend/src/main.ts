import express from "express";
import "dotenv/config";
import cors from "cors";

import type { Express } from "express";

const PORT: number = parseInt(process.env.PORT || "8000", 10);

const app: Express = express();

app.use(cors());
app.use(express.json());

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
