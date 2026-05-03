import { Router } from 'express';
import { createEventController, getEventsController } from '../controllers/event.controller';
import { validateEvent } from '../middlewares/validateEvent.middleware';

const router = Router();

router.post('/events', validateEvent, createEventController);
router.get('/events', getEventsController);

export default router;