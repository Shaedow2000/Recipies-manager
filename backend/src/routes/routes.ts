import express from "express";

import type { Request, Response } from "express";
import { Get } from "../db/db.ts";

const router: express.Router = express.Router();

const get: Get = new Get();

router.get("/", async (_req: Request, res: Response): Promise<Response> => {
  return res.status(400).json({
    message: "This is not a valid route. Please check the routes:",
    routes: {
      categories: "GET /categories",
      recipes: "GET /recipes",
      recipe_by_id: "GET /recipes/:id",
      new_recipe: "POST /recipes",
    },
  });
});

router.get(
  "/categories",
  async (_req: Request, res: Response): Promise<Response> => {
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
  },
);

router.get(
  "/recipes",
  async (_req: Request, res: Response): Promise<Response> => {
    const recipes:
      | {
          id: number;
          name: string;
          category: string;
          instructions: string;
          prep_time: number;
          cook_time: number;
          ingredients: {
            name: string;
            amount: string;
          }[];
        }[]
      | {
          id: number;
          name: string;
          category: string;
          instructions: string;
          prep_time: number;
          cook_time: number;
          ingredients: {
            name: string;
            amount: string;
          }[];
        }
      | undefined = await get.recipes();

    return res.status(200).json({
      recipes: recipes,
    });
  },
);

router.get(
  "/recipes/:id",
  async (req: Request, res: Response): Promise<Response> => {
    const recipe:
      | {
          id: number;
          name: string;
          category: string;
          instructions: string;
          prep_time: number;
          cook_time: number;
          ingredients: {
            name: string;
            amount: string;
          }[];
        }[]
      | {
          id: number;
          name: string;
          category: string;
          instructions: string;
          prep_time: number;
          cook_time: number;
          ingredients: {
            name: string;
            amount: string;
          }[];
        }
      | undefined = await get.recipes(
      parseInt(req.params.id.toString() || "-1"),
    );

    return res.status(200).json({
      recipe: recipe,
    });
  },
);

router.post("/recipes", () => {});

export default router;
