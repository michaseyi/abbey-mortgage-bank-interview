import Koa from 'koa';
import routes from './routes';
import config from './config';
import db from './database/db';

const app = new Koa();

app.use(routes.routes());

db.initialize()
  .then(() => {
    console.log('Database has been initialized!');

    app.listen(config.app.port, () => {
      console.log('Server has started!');
    });
  })
  .catch((err) => {
    console.error('Error during database initialization:', err);
  });
