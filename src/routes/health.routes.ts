import { Router } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     tags:
 *       - Health
 *     responses:
 *       200:
 *         description: API is running
 */

router.get('/health', healthCheck);

export default router;