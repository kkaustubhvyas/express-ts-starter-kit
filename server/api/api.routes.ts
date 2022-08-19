import express from 'express';
import { useRoleGuard } from '../common/middlewares/role-guard.middleware';
import { RESOURCES, ROLES } from '../common/utilities/constants';
import exampleRouter from './example/example.router';

const apiRouter = express.Router({}).use('/examples', useRoleGuard([RESOURCES.ALL], [ROLES.ALL]), exampleRouter);

export default apiRouter;
