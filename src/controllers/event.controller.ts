import { Request, Response, NextFunction } from 'express';
import { createEvent, getEvents, getEventsByUserId, countEvents } from '../services/event.service';
import { getPaginationParams } from '../utils/pagination';

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
        const { page, limit } = getPaginationParams(
            req.query.page,
            req.query.limit
        );
        const filters = {
            userId: req.query.userId as string | undefined,
            type: req.query.type as string | undefined,
            ip: req.query.ip as string | undefined
        };

        const totalEvents = await countEvents(filters);
        const totalPages = Math.ceil(totalEvents / limit);

        const events = await getEvents(page, limit, filters);

        res.status(200).json({
            status: 'success',
            page,
            limit,
            totalEvents,
            totalPages,
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