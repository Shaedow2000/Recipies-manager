import express from "express";

import type { Request, Response } from "express";
import { Get, Post } from "../db/db.ts";
import controllerWrapper from "../utils/contoller.error.handler.ts";

const router: express.Router = express.Router();

const get: Get = new Get();
const post: Post = new Post();

router.get(
  "/",
  controllerWrapper(async (_req: Request, res: Response): Promise<Response> => {
    return res.status(400).json({
      message: "This is not a valid route. Please check the routes:",
      routes: {
        categories: "GET /categories",
        recipes: "GET /recipes",
        recipe_by_id: "GET /recipes/:id",
        new_recipe: "POST /recipes",
      },
    });
  }),
);

router.get(
  "/categories",
  controllerWrapper(async (_req: Request, res: Response): Promise<Response> => {
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
  }),
);

router.get(
  "/recipes",
  controllerWrapper(async (_req: Request, res: Response): Promise<Response> => {
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
  }),
);

router.get(
  "/recipes/:id",
  controllerWrapper(async (req: Request, res: Response): Promise<Response> => {
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
  }),
);

router.post(
  "/recipes",
  controllerWrapper(async (req: Request, res: Response): Promise<Response> => {
    const {
      name,
      category,
      instructions,
      prep_time,
      cook_time,
      ingredients,
    }: {
      name: string;
      category: number;
      instructions: string;
      prep_time: number;
      cook_time: number;
      ingredients: { name: string; amount: string }[];
    } = req.body;

    const newRecipe: {
      id: number;
      name: string;
    } = await post.recipe(
      name,
      category,
      instructions,
      prep_time,
      cook_time,
      ingredients,
    );

    return res.status(201).json({
      recipe: newRecipe,
    });
  }),
);

export default router;
