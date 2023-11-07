import { Router } from 'express';

import * as users from '../controllers/user';

const routes = Router();

routes.get('/', users.count);
routes.get('/search', users.search);
routes.get('/email-confirmation/:token', users.emailConfirmation);

routes.post('/', users.create);
routes.post('/forgot-password', users.forgotPassword);

routes.patch('/reset-password/:token', users.resetPassword);

export default routes;