import path from 'path';
import { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export default function openapi(app: Application) {
  const root = path.normalize(`${__dirname}/../..`);

  // eslint-disable-next-line global-require
  const swaggerDocument = YAML.load(`${root}/server/docs/api.yml`);

  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(swaggerDocument));
  app.enable('case sensitive routing');
  app.enable('strict routing');
}
