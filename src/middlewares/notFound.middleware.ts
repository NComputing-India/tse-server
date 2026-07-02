// Returns 404 for routes that do not exist.
import type { RequestHandler } from 'express';

export const notFoundMiddleware: RequestHandler = (req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
};
