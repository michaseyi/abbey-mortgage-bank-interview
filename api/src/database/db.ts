import { DataSource } from 'typeorm';
import config from '../config';

import models from './models';

const db = new DataSource({
  type: config.db.type,
  url: config.db.uri,
  synchronize: true,
  logging: false,
  entities: [
    models.AuthFlow,
    models.Session,
    models.Thought,
    models.Feed,
    models.User,
    models.UserFollowers,
  ],
  subscribers: [],
  migrations: [],
});

export default db;
