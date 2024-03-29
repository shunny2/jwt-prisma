import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';

import { errors } from './middlewares';
import { SwaggerConfigs } from './docs/swagger-config';

const app = express();

// Cross Origin Resource Sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Middleware for cookies
app.use(cookieParser());

// Built-in middleware for json
app.use(express.json());

// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// Swagger Configs
if (process.env.NODE_ENV !== 'test') {
    const swaggerSpec = swaggerJSDoc(SwaggerConfigs);

    app.get('/api/v1/swagger.json', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

// Routes
app.use('/api/v1', routes);

// Middleware for errors
app.use(errors);

export default app;