import type { ActionFunctionArgs } from "react-router";
import { apiFetch } from "../utils/api";
import type { ApiResponse } from "../types/ApiResponseType";

async function newRecipe({ request }: ActionFunctionArgs) {
  const data = await request.formData();

  const name: unknown = data.get("name");
  const category: unknown = data.get("category");
  const instructions: unknown = data.get("instructions");
  const ingName: unknown = data.get("ing_name");
  const ingAmount: unknown = data.get("ing_amount");
  const prepTime: unknown = data.get("prep_time");
  const cookTime: unknown = data.get("cook_time");

  const body = {
    name,
    category,
    instructions,
    prep_time: prepTime,
    cook_time: cookTime,
    ingredients: [
      {
        name: ingName,
        amount: ingAmount,
      },
    ],
  };

  const response: ApiResponse = await apiFetch("recipes", "POST", body);

  console.log(response);
}

export default newRecipe;
