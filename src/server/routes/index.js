import { Router } from 'express';

import drugsRoutes from './drugs';
import locationsRoutes from './locations';
import playersRoutes from './players';

const routes: Object = Router();

routes.use('/drugs', drugsRoutes);
routes.use('/locations', locationsRoutes);
routes.use('/players', playersRoutes);

export default routes;
