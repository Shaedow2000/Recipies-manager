export type ApiResponse =
  | {
      ok: false;
      error: {
        status: number | undefined;
        message: unknown;
      };
    }
  | {
      ok: true;
      data: any;
    };
