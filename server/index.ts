import './common/env';
import Server from './common/server';
import routes from './routes';

const port = parseInt(process.env.PORT || '8000');
export default new Server()
  .router(routes)
  .listen(port);
