import { Request, Response } from 'express';
import { createEvent, getEvents } from '../services/event.service';

export const createEventController = (req: Request, res: Response) => {
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


    const event = createEvent(data);
    res.status(201).json({
        status: 'success',
        data: event
    });

};

export const getEventsController = (req: Request, res: Response) => {
    const events = getEvents();

    res.status(200).json({
        status: 'success',
        results: events.length,
        data: events
    })
};