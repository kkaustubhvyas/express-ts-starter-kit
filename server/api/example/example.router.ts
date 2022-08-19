import express from 'express';
import { controllerWrapper } from '../../common/middlewares/response-handler.middleware';
import exampleController from './example.controller';
import { useRoleGuard } from '../../common/middlewares/role-guard.middleware';
import { RESOURCES, ROLES } from '../../common/utilities/constants';

const exampleRouter = express
  .Router({ mergeParams: true })
  .get('/:id', controllerWrapper(exampleController.get))
  .get('/', controllerWrapper(exampleController.get))
  .post('/', useRoleGuard([RESOURCES.EXAMPLES], [ROLES.ADMIN]), controllerWrapper(exampleController.post))
  .put('/:id', useRoleGuard([RESOURCES.EXAMPLES], [ROLES.ADMIN]), controllerWrapper(exampleController.put));

export default exampleRouter;
