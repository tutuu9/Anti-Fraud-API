import express from 'express';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Anti-Fraud API is running'
  });
});

export default app;