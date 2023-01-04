import 'express-async-errors';

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes';
import Logging from './lib/logging';

import { errors } from './middlewares';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Cross Origin Resource Sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', routes);

// Middleware for errors
app.use(errors);

app.listen(PORT, () => {
    Logging.info(`[SERVER]: Server is running at https://localhost:${PORT}`);
});