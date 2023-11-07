import { Router } from 'express';

import * as users from '../controllers/user';

const routes = Router();

routes.get('/', users.count);
routes.get('/search', users.search);

routes.post('/', users.create);

routes.get('/email-confirmation/:token', users.emailConfirmation);

export default routes;