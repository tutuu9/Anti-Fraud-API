import { Request, Response, NextFunction } from 'express';
import { createEvent, getEvents } from '../services/event.service';

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
        const events = await getEvents();

        res.status(200).json({
            status: 'success',
            results: events.length,
            data: events
        });
    } catch (error) {
        next(error);
    }
};