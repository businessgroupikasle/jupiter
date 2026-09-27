import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error & { code?: string; meta?: any },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Unhandled Server Error:', err);

  // Prisma known errors — return clear messages instead of raw stack traces
  if (err.constructor?.name === 'PrismaClientKnownRequestError' || err.code?.startsWith('P')) {
    const code = err.code || 'UNKNOWN';
    let message = 'Database error';
    let statusCode = 400;

    switch (code) {
      case 'P2002': // Unique constraint violation
        const target = err.meta?.target;
        message = `A record with this ${Array.isArray(target) ? target.join(', ') : target || 'value'} already exists.`;
        statusCode = 409;
        break;
      case 'P2025': // Record not found
        message = 'Record not found.';
        statusCode = 404;
        break;
      case 'P2003': // Foreign key constraint
        message = 'Related record not found. Check referenced IDs.';
        statusCode = 400;
        break;
      case 'P2014': // Required relation violation
        message = 'This change would violate a required relation.';
        statusCode = 400;
        break;
      default:
        message = `Database error (${code}): ${err.message}`;
        statusCode = 500;
    }

    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === 'development' ? { code, stack: err.stack } : {}),
    });
    return;
  }

  // Prisma validation errors
  if (err.constructor?.name === 'PrismaClientValidationError') {
    res.status(400).json({
      success: false,
      message: 'Invalid data sent to database. Please check all fields.',
      ...(process.env.NODE_ENV === 'development' ? { detail: err.message, stack: err.stack } : {}),
    });
    return;
  }

  // CORS errors
  if (err.message === 'Not allowed by CORS') {
    res.status(403).json({
      success: false,
      message: 'CORS: Origin not allowed.',
    });
    return;
  }

  // JSON parse errors
  if (err instanceof SyntaxError && (err as any).status === 400) {
    res.status(400).json({
      success: false,
      message: 'Invalid JSON in request body.',
    });
    return;
  }

  // Default error
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' ? { stack: err.stack } : {}),
  });
};
