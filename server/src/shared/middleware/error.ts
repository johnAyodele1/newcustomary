import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) return response.status(400).json({ message: 'Invalid request.', issues: error.issues });
  const message = error instanceof Error ? error.message : 'Unexpected server error.';
  return response.status(500).json({ message });
};
