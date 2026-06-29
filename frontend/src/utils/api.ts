import ApiFetchError from "../types/ApiFetchError";
import type { ApiResponse } from "../types/ApiResponseType";

type Methods = "GET" | "POST";

async function apiFetch(
  endpoint: string,
  method: Methods = "GET",
  body: any = null,
): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `/api/${endpoint}`,
      method === "POST"
        ? {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        : undefined,
    );

    if (!response.ok) {
      throw new ApiFetchError((await response.json()).error, response.status);
    }

    const json = await response.json();

    return {
      ok: true,
      data: json,
    };
  } catch (error: unknown) {
    const errorObj: {
      ok: false;
      error: {
        status: number | undefined;
        message: string | unknown;
      };
    } = {
      ok: false,
      error: {
        status: error instanceof ApiFetchError ? error.status : undefined,
        message:
          error instanceof ApiFetchError || error instanceof Error
            ? error.message
            : error,
      },
    };

    return errorObj;
  }
}

export { apiFetch };
