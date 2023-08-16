import { Router } from 'express';

import { verifyToken } from '../middlewares';

import * as auth from '../controllers/auth';

const routes = Router();

routes.get('/', verifyToken, auth.authenticated);
routes.get('/me', verifyToken, auth.me);

routes.post('/login', auth.login);
routes.post('/logout', auth.logout);
routes.post('/refresh', auth.refresh);

export default routes;