import { Pool } from "pg";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import type { QueryResult } from "pg";
import type {
  Ingredients,
  Recipe,
  RecipeInfo,
  RecipeType,
} from "../types/RecipeType.ts";

const __dirname: string = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: resolve(__dirname, "../../../.env"),
  override: true,
  quiet: true,
  encoding: "utf-8",
});

const PGUSER: string = process.env.PGUSER || "";
const PGPASSWORD: string = process.env.PGPASSWORD || "";
const PGDB: string = process.env.PGDB || "";

const pool: Pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  database: PGDB,
});

// controllers
class Get {
  public async categories(): Promise<string[]> {
    const query: { text: string; rowMode: string } = {
      text: "SELECT name FROM category",
      rowMode: "array",
    };

    const categorieNames: QueryResult<any> = await pool.query(query);

    return categorieNames.rows.map((category: string[]): string => category[0]);
  }

  public async recipes(id: number | undefined = undefined): Promise<any> {
    const recipesObj: QueryResult<any> = await pool.query(
      "SELECT r.id, r.name, c.name AS category, r.instructions, r.prep_time, r.cook_time, i.name AS ingredient_name, ri.amount FROM recipe_ingredients AS ri JOIN ingredients AS i ON i.id = ri.ingredient_id JOIN recipe AS r ON r.id = ri.recipe_id JOIN category AS c ON r.category_id = c.id;",
    );

    let recipesInfo: RecipeInfo = [];
    let recipesIngredients: Ingredients = [];
    let recipesIds: number[] = [];

    recipesObj.rows.forEach((recipe: Recipe): void => {
      if (!recipesIds.includes(recipe.id)) {
        recipesInfo.push({
          id: recipe.id,
          name: recipe.name,
          category: recipe.category,
          instructions: recipe.instructions,
          prep_time: recipe.prep_time,
          cook_time: recipe.cook_time,
        });

        recipesIngredients.push({
          id: recipe.id,
          ingredients: [
            {
              name: recipe.ingretients_name,
              amount: recipe.amount,
            },
          ],
        });

        recipesIds.push(recipe.id);
      } else {
        let ingredient = recipesIngredients.find((r) => r.id === recipe.id);
        ingredient?.ingredients.push({
          name: recipe.ingretients_name,
          amount: recipe.amount,
        });
      }
    });

    let recipes: RecipeType[] = [];

    for (let i: number = 0; i < recipesIds.length; i++) {
      recipes.push({
        ...recipesInfo[i],
        ingredients: recipesIngredients[i].ingredients,
      });
    }

    return id && id > 0 ? recipes.find((r) => r.id === id) : recipes;
  }
}

class Post {
  public async recipe(
    name: string,
    category: number,
    instructions: string,
    prep_time: number,
    cook_time: number,
    ingredients: { name: string; amount: string }[],
  ): Promise<{
    id: number;
    name: string;
  }> {
    await pool.query("BEGIN;");

    const recipe = await pool.query(
      "INSERT INTO recipe(name, category_id, instructions, prep_time, cook_time) VALUES ($1, $2, $3, $4, $5) RETURNING id;",
      [name, category, instructions, prep_time, cook_time],
    );

    let recipe_id: number = recipe.rows[0].id;

    for (let i: number = 0; i < ingredients.length; i++) {
      await pool.query(
        "INSERT INTO ingredients (name) VALUES ($1) ON CONFLICT (name) DO NOTHING;",
        [ingredients[i].name],
      );
    }

    for (let i: number = 0; i < ingredients.length; i++) {
      let ingredient = await pool.query(
        "SELECT id FROM ingredients WHERE name = $1",
        [ingredients[i].name],
      );

      let ingredient_id = ingredient.rows[0].id;

      await pool.query(
        "INSERT INTO recipe_ingredients(recipe_id, ingredient_id, amount) VALUES ($1, $2, $3)",
        [recipe_id, ingredient_id, ingredients[i].amount],
      );
    }

    await pool.query("COMMIT;");

    return { id: recipe_id, name: name };
  }
}

export { Get, Post };
