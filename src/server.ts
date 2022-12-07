import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Cross Origin Resource Sharing
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});