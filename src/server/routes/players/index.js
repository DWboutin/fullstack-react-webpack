import { Router } from 'express';

import playerController from '../../controllers/playerController';

const routes: Object = Router();

routes.get('/find', playerController.read);
routes.post('/create', playerController.create);
routes.put('/update/:id', playerController.update);
routes.post('/delete/:id', playerController.delete);

export default routes;