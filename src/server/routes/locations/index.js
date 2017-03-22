import { Router } from 'express';

import locationController from '../../controllers/locationController';

const routes: Object = Router();

routes.get('/find', locationController.read);
routes.post('/create', locationController.create);
routes.put('/update/:id', locationController.update);
routes.post('/delete/:id', locationController.delete);

export default routes;