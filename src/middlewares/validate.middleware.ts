import type { RequestHandler } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodType): RequestHandler {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ status: 403, error: result.error.issues[0]?.path[0], msg: 'Validation failed.' });
      return;
    }
    req.body = result.data;
    next();
  };
}
