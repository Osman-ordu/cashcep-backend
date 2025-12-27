import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorMiddleware } from './middlewares/error.middleware';
import userRoutes from './modules/user/user.routes';
import quickTransactionsRoutes from './modules/transactions/quickTransactions/quickTransactions.routes';
import { env } from './config/env';

const app: Application = express();

// CORS Configuration
app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware (only in development)
if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions/quick-transaction-list', quickTransactionsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    environment: env.NODE_ENV 
  });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

export default app;

