import type { ApiResponse } from "../types/ApiResponseType";
import { apiFetch } from "../utils/api";

async function getAllRecipes() {
  const response: ApiResponse = await apiFetch("recipes");

  return {
    ok: response.ok,
    data: response.ok ? response.data : response.error,
  };
}

export default getAllRecipes;
