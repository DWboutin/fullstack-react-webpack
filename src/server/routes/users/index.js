import { Router } from 'express';

import userController from '../../controllers/userController';

const routes: Object = Router();

routes.get('/find', userController.read);
routes.post('/create', userController.create);
routes.put('/update/:id', userController.update);
routes.post('/delete/:id', userController.delete);

export default routes;