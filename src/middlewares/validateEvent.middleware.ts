import { Request, Response, NextFunction } from 'express';

export const validateEvent = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = req.body;
    const allowedTypes = ['login', 'order', 'request'] as const;
    
    if (!data.userId || !data.userId.trim()) {
        return res.status(400).json({
            status: 'error',
            message: 'userId is required'
        });
    }

    if (!data.ip || !data.ip.trim()) {
        return res.status(400).json({
            status: 'error',
            message: 'ip is required'
        });
    }

    if (!allowedTypes.includes(data.type)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid event type'
        });
    }

    next();
};