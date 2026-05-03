import express from 'express';
import healthRoutes from './routes/health.routes';
import eventRoutes from './routes/event.routes';
import riskRoutes from './routes/risk.routes';

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(eventRoutes);
app.use(riskRoutes);

export default app;