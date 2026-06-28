import type { Request, Response, NextFunction } from "express";
import FieldError from "../types/FieldError.ts";

function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  console.error(
    "[ ERROR ]> %s",
    error instanceof FieldError || error instanceof Error
      ? error.message
      : error,
  );

  return res.status(error instanceof FieldError ? 400 : 500).json({
    status: "error",
    error:
      error instanceof FieldError
        ? {
            field: error.filed,
            message: error.message,
          }
        : error instanceof Error
          ? error.message
          : error,
  });
}

export default errorHandler;
