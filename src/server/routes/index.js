import { Router } from 'express';

import drugsRoutes from './drugs';
import locationsRoutes from './locations';

const routes: Object = Router();

routes.use('/drugs', drugsRoutes);
routes.use('/locations', locationsRoutes);

export default routes;
