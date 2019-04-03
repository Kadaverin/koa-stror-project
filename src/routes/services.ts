import * as Router from 'koa-router';
import { ServicesController } from './../controllers';

const ServicesRouter = new Router({
  prefix: '/services',
});

ServicesRouter.post('/', ServicesController.createService);
ServicesRouter.post('/:id/execute', ServicesController.executeService);
ServicesRouter.patch('/:id', ServicesController.changeServiceState);

export { ServicesRouter };
