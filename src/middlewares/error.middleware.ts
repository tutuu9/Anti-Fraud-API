import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    res.status(500).json({
        status: 'error',
        message: error.message || 'Internal server error'
    });
};