import { Router } from 'express';
import { getUserRiskController, getUserRiskHistoryController } from '../controllers/risk.controller';

const router = Router();

router.get('/risk/:userId/history', getUserRiskHistoryController);
router.get('/risk/:userId', getUserRiskController);

export default router;