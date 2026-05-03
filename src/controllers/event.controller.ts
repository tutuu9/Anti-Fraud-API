import { Request, Response, NextFunction } from 'express';
import { createEvent, getEvents, getEventsByUserId } from '../services/event.service';

export const createEventController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        const event = await createEvent(data);

        res.status(201).json({
            status: 'success',
            data: event
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const events = await getEvents(page, limit);
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: events
        });
    } catch (error) {
        next(error);
    }
};

export const getEventsByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId as string;
        const events = await getEventsByUserId(userId);
        res.status(200).json({
            status: 'success',
            results: events.length,
            data: events
        });
    } catch (error) {
        next(error);
    }
};