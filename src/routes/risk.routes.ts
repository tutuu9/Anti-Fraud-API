import { Router } from 'express';
import { getUserRiskController, getUserRiskHistoryController } from '../controllers/risk.controller';

const router = Router();

/**
 * @swagger
 * /risk/{userId}/history:
 *   get:
 *     summary: Get risk check history by user ID
 *     tags:
 *       - Risk
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: user_1
 *         description: User ID
 *     responses:
 *       200:
 *         description: Risk check history returned successfully
 */
router.get('/risk/:userId/history', getUserRiskHistoryController);

/**
 * @swagger
 * /risk/{userId}:
 *   get:
 *     summary: Calculate user fraud risk score
 *     tags:
 *       - Risk
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: user_1
 *         description: User ID
 *     responses:
 *       200:
 *         description: User risk score calculated successfully
 */
router.get('/risk/:userId', getUserRiskController);

export default router;