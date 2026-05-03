import express from 'express';
import healthRoutes from './routes/health.routes';
import eventRoutes from './routes/event.routes';
import riskRoutes from './routes/risk.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(eventRoutes);
app.use(riskRoutes);

app.use(errorMiddleware);
export default app;