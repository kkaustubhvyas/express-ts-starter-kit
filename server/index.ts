import './common/env';
import Server from './common/server';

const port = parseInt(process.env.PORT || '8000', 10);

export default new Server().setup(port);
