import { Router } from 'express';
import { createEventController, getEventsController, getEventsByUserIdController } from '../controllers/event.controller';
import { validateEvent } from '../middlewares/validateEvent.middleware';

const router = Router();

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new user event
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - type
 *               - ip
 *             properties:
 *               userId:
 *                 type: string
 *                 example: user_1
 *               type:
 *                 type: string
 *                 enum: [login, order, request]
 *                 example: login
 *               ip:
 *                 type: string
 *                 example: 10.0.0.1
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               phone:
 *                 type: string
 *                 example: "+48123456789"
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Invalid request body
 */
router.post('/events', validateEvent, createEventController);

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get events with pagination and filters
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Number of events per page
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *           example: user_1
 *         description: Filter events by user ID
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [login, order, request]
 *           example: login
 *         description: Filter events by event type
 *       - in: query
 *         name: ip
 *         schema:
 *           type: string
 *           example: 10.0.0.1
 *         description: Filter events by IP address
 *     responses:
 *       200:
 *         description: Events list returned successfully
 */
router.get('/events', getEventsController);


/**
 * @swagger
 * /events/user/{userId}:
 *   get:
 *     summary: Get events by user ID
 *     tags:
 *       - Events
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
 *         description: User events returned successfully
 */
router.get('/events/user/:userId', getEventsByUserIdController);

export default router;