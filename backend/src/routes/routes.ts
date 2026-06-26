import express from "express";

import type { Request, Response } from "express";
import { Get } from "../db/db.ts";

const router: express.Router = express.Router();

const get: Get = new Get();

router.get("/categories", async (_req: Request, res: Response) => {
  const categories: string[] = await get.categories();

  return res.status(200).json({
    categories: [
      {
        id: 1,
        name: categories[0],
      },
      {
        id: 2,
        name: categories[1],
      },
      {
        id: 3,
        name: categories[2],
      },
      {
        id: 4,
        name: categories[3],
      },
    ],
  });
});

router.get("/recipes", () => {});

router.get("/recipes/:id", () => {});

router.post("/recipes", () => {});

export default router;
