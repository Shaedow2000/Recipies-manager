import type { ApiResponse } from "../types/ApiResponseType";
import { apiFetch } from "../utils/api";

async function getRecipeById(id: number) {
  const response: ApiResponse = await apiFetch(`recipes/${id}`);

  return {
    ok: response.ok,
    data: response.ok ? response.data : response.error,
  };
}

export default getRecipeById;
