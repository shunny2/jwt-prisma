import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1', routes);

app.listen(PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${PORT}`);
});