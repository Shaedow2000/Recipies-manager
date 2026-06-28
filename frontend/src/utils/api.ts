import ApiFetchError from "../types/ApiFetchError";

async function apiFetch(endpoint: string) {
  try {
    const response = await fetch(`/api/${endpoint}`);

    if (!response.ok) {
      throw new ApiFetchError(response.statusText, response.status);
    }

    const json = await response.json();

    return {
      ok: true,
      data: json,
    };
  } catch (error: unknown) {
    const errorObj: {
      ok: boolean;
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
