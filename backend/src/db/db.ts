import { Pool } from "pg";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import type { QueryResult } from "pg";

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

  public async recipes(id: number | undefined = undefined): Promise<
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
    | undefined
  > {
    const recipesObj: QueryResult<any> = await pool.query(
      "SELECT r.id, r.name, c.name AS category, r.instructions, r.prep_time, r.cook_time, i.name AS ingredient_name, ri.amount FROM recipe_ingredients AS ri JOIN ingredients AS i ON i.id = ri.ingredient_id JOIN recipe AS r ON r.id = ri.recipe_id JOIN category AS c ON r.category_id = c.id;",
    );

    let recipe_ids: number[] = [];

    let recipes: {
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
    }[] = [];

    let recipesInfo: {
      id: number;
      name: string;
      category: string;
      instructions: string;
      prep_time: number;
      cook_time: number;
    }[] = [];

    let ingredients: {
      id: number;
      ingredients: {
        name: string;
        amount: string;
      }[];
    }[] = [];

    recipesObj.rows.map(
      (recipe: {
        id: number;
        name: string;
        category: string;
        instructions: string;
        prep_time: number;
        cook_time: number;
        ingredient_name: string;
        amount: string;
      }): void => {
        if (!recipe_ids.includes(recipe.id)) {
          recipesInfo.push({
            id: recipe.id,
            name: recipe.name,
            category: recipe.category,
            instructions: recipe.instructions,
            prep_time: recipe.prep_time,
            cook_time: recipe.cook_time,
          });

          ingredients.push({
            id: recipe.id,
            ingredients: [
              {
                name: recipe.ingredient_name,
                amount: recipe.amount,
              },
            ],
          });

          recipe_ids.push(recipe.id);
        } else {
          let ingredientsObj:
            | {
                id: number;
                ingredients: {
                  name: string;
                  amount: string;
                }[];
              }
            | undefined;

          ingredientsObj = ingredients.find((ingrd) => ingrd.id === recipe.id);

          if (!ingredientsObj) {
            return;
          }

          ingredientsObj?.ingredients.push({
            name: recipe.ingredient_name,
            amount: recipe.amount,
          });
        }

        let recipeObj:
          | {
              id: number;
              name: string;
              category: string;
              instructions: string;
              prep_time: number;
              cook_time: number;
            }
          | undefined = recipesInfo.find((r) => r.id === recipe.id);

        let ingredientsObj:
          | {
              id: number;
              ingredients: {
                name: string;
                amount: string;
              }[];
            }
          | undefined = ingredients.find((i) => i.id === recipe.id);

        if (!recipeObj || !ingredientsObj) {
          return;
        }

        recipes.push({
          ...recipeObj,
          ingredients: ingredientsObj.ingredients,
        });
      },
    );

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
  ) {
    await pool.query(
      "INSERT INTO recipe(name, category_id, instructions, prep_time, cook_time) VALUES ($1, $2, $3, $4, $5)",
      [name, category, instructions, prep_time, cook_time],
    );

    return { name: name, added: true };
  }
}

export { Get, Post };
