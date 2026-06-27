import type { Request, Response, NextFunction } from "express";

function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): Response {
  console.error(
    "[ ERROR ]> %s",
    error instanceof Error ? error.message : error,
  );

  return res.status(500).json({
    status: "error",
    message: error instanceof Error ? error.message : error,
  });
}

export default errorHandler;
