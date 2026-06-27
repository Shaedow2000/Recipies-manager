import type { Request, Response, NextFunction } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

function controllerWrapper(f: AsyncController): AsyncController {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await f(req, res, next);
    } catch (error: unknown) {
      next(error);
    }
  };
}

export default controllerWrapper;
