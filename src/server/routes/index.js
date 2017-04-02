import { Router } from 'express';

import usersRoutes from './users';

const routes: Object = Router();

routes.use('/users', usersRoutes);

export default routes;
