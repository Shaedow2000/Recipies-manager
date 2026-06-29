import type { ApiResponse } from "../types/ApiResponseType";
import { apiFetch } from "../utils/api";

async function getCategories() {
  const response: ApiResponse = await apiFetch("categories");

  return {
    ok: response.ok,
    data: response.ok ? response.data : response.error,
  };
}

export default getCategories;
