// Returns a 500 response for thrown errors.
import type { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const message = err instanceof Error ? err.message : 'Internal Server Error';

  res.status(500).json({ message });
};
