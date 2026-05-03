import { Router } from 'express';
import { getUserRiskController } from '../controllers/risk.controller';

const router = Router();

router.get('/risk/:userId', getUserRiskController);

export default router;