import dotenv from 'dotenv';
import { env } from 'process';

dotenv.config();

type Config = {
  environment: string;
  app: {
    port: number;
  };
  db: {
    uri: string;
    type: 'postgres' | 'mysql' | 'mongodb';
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  smtp: {
    host: string;
    user: string;
    password: string;
    from: string;
  };
};



function validateConfig(config: any): asserts config is Config {
  if (typeof config.environment !== 'string') {
    throw new Error('Config must have an environment string');
  }

  if (typeof config.app.port !== 'number') {
    throw new Error('Config must have an app.port number');
  }

  if (typeof config.db.uri !== 'string') {
    throw new Error('Config must have a db.uri string');
  }

  if (!['postgres', 'mysql', 'mongodb'].includes(config.db.type)) {
    throw new Error(
      'Config db.type must be one of postgres, mysql, or mongodb',
    );
  }

  if (typeof config.jwt.secret !== 'string') {
    throw new Error('Config must have a jwt.secret string');
  }

  if (typeof config.jwt.expiresIn !== 'string') {
    throw new Error('Config must have a jwt.expiresIn string');
  }

  if (typeof config.smtp.host !== 'string') {
    throw new Error('Config must have an smtp.host string');
  }

  if (typeof config.smtp.user !== 'string') {
    throw new Error('Config must have an smtp.user string');
  }

  if (typeof config.smtp.password !== 'string') {
    throw new Error('Config must have an smtp.password string');
  }

  if (typeof config.smtp.from !== 'string') {
    throw new Error('Config must have an smtp.from string');
  }
}

const config = {
  environment: env.ENVIRONMENT ?? 'development',
  app: {
    port: env.PORT ? +env.PORT : 3000,
  },
  db: {
    uri: env.DB_URI,
    type: env.DB_TYPE,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
  smtp: {
    host: env.SMTP_HOST,
    user: env.SMTP_USER,
    password: env.SMTP_PASSWORD,
    from: env.SMTP_FROM,
  },
};

validateConfig(config);

export default config as Config;
