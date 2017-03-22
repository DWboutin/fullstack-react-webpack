import { Router } from 'express';

import drugController from '../../controllers/drugController';

const routes: Object = Router();

routes.get('/find', drugController.read);
routes.post('/create', drugController.create);
routes.put('/update/:id', drugController.update);
routes.post('/delete/:id', drugController.delete);

export default routes;