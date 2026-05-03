import { Router } from 'express';
import { createEventController, getEventsController, getEventsByUserIdController } from '../controllers/event.controller';
import { validateEvent } from '../middlewares/validateEvent.middleware';

const router = Router();

router.post('/events', validateEvent, createEventController);
router.get('/events', getEventsController);
router.get('/events/user/:userId', getEventsByUserIdController);

export default router;