import { Router } from 'express';
import { createEventController } from '../controllers/event.controller';

const router = Router();

router.post('/events', createEventController);

export default router;