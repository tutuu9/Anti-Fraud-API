import { Request, Response } from 'express';
import { createEvent, getEvents } from '../services/event.service';

export const createEventController = async (req: Request, res: Response) => {
    const data = req.body;

    const event = await createEvent(data);

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
    });
};