import 'dotenv/config';

import app from './app';
import Logging from './lib/logging';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    Logging.info(`[SERVER]: Server is running at https://localhost:${PORT}/api/v1`);
});