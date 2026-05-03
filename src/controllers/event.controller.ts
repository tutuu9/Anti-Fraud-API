import { Request, Response } from 'express';
import { createEvent, getEvents } from '../services/event.service';

export const createEventController = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        const event = await createEvent(data);

        res.status(201).json({
            status: 'success',
            data: event
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create event'
        });
    }
};

export const getEventsController = async (req: Request, res: Response) => {
    try {
        const events = await getEvents();

        res.status(200).json({
            status: 'success',
            results: events.length,
            data: events
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to get events'
        });
    }
};