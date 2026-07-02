import express from 'express';
import cors from 'cors';
import { loggerMiddleware } from './middlewares/logger.middleware.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import routes from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.get('/health', (_req, res) => {
  res.json({ status: 200, msg: 'healthy' });
});

app.use('/v3/api', routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
