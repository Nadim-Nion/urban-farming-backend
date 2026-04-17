import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  type Application,
  type Request,
  type Response,
} from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// Parser or Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  }),
);

// application routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Express Project Setup! 😊');
});

// Not Found Route
app.use(notFound);

// Handle all Global Errors of the Express Application
app.use(globalErrorHandler);

export default app;
