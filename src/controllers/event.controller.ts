import { Request, Response } from 'express';
import { createEvent } from '../services/event.service';

export const createEventController = (req: Request, res: Response) => {
    const data = req.body;

    const event = createEvent(data);

    res.status(201).json({
        status: 'success',
        data: event
    });

};