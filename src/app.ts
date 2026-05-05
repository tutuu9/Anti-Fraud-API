import express from 'express';
import healthRoutes from './routes/health.routes';
import eventRoutes from './routes/event.routes';
import riskRoutes from './routes/risk.routes';
import { errorMiddleware } from './middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(healthRoutes);
app.use(eventRoutes);
app.use(riskRoutes);

app.use(errorMiddleware);
export default app;