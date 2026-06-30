import type { ApiResponse } from "../types/ApiResponseType";
import { apiFetch } from "./api";

async function search(q: string) {
  const response: ApiResponse = await apiFetch(`recipes/t/${q}`);

  return {
    ok: response.ok,
    data: response.ok ? response.data.recipes : response.error,
  };
}

export default search;
