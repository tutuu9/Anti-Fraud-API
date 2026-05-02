import express from 'express';
import healthRoutes from './routes/health.routes';
import eventRoutes from './routes/event.routes';

const app = express();

app.use(express.json());

app.use(healthRoutes);
app.use(eventRoutes);

export default app;