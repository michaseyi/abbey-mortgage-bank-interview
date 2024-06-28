import Koa from 'koa';
import routes from './routes';
import config from './config';
import db from './database/db';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors());

app.use(routes.routes());

app.listen(config.app.port, () => {
  console.log('Server has started!');

  db.initialize()
    .then(() => {
      console.log('Database has been initialized!');
    })
    .catch((err) => {
      console.error('Error during database initialization:', err);
    });
});
