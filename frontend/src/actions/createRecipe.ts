import type { ActionFunctionArgs } from "react-router";
import { apiFetch } from "../utils/api";
import type { ApiResponse } from "../types/ApiResponseType";

async function newRecipe({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const name: unknown = data.get("name");
  const category: number = parseInt(
    data.get("category")?.toString() || "0",
    10,
  );
  const instructions: unknown = data.get("instructions");
  const ingredients: { name: string; amount: string }[] = JSON.parse(
    data.get("ingredients")?.toString() || "[]",
  );
  const prepTime: string | undefined = data.get("prep_time")?.toString();
  const cookTime: string | undefined = data.get("cook_time")?.toString();

  const body = {
    name,
    category,
    instructions,
    prep_time: parseInt(prepTime || "0", 10),
    cook_time: parseInt(cookTime || "0", 10),
    ingredients,
  };

  const response: ApiResponse = await apiFetch("recipes", "POST", body);

  return {
    ok: response.ok,
  };
}

export default newRecipe;
