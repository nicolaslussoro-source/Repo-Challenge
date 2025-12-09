import express from 'express';
import authRouter from './routes/auth.routes';
import metricsRouter from './routes/metrics.routes';
import { init as initDb } from './db';
import { envs } from './config/env';

const app = express();
app.use(express.json());

app.use('/auth', authRouter);

app.use('/metrics', metricsRouter);

initDb().catch((err) => {
  console.error('Failed to initialize DB', err);
  process.exit(1);
});

app.listen(envs.PORT, () => {
  console.log(`Server listening on http://localhost:${envs.PORT }`);
});
