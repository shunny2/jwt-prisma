import { Router } from 'express';

import * as users from '../controllers/user';

const routes = Router();

routes.get('/', users.count);
routes.get('/search', users.search);

routes.post('/', users.create);

export default routes;