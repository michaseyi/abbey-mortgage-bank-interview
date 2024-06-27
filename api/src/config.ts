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
    service: string;
    authType: string;
    clientId: string;
    user: string;
    clientSecret: string;
    refreshToken: string;
    accessToken: string;
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

  if (typeof config.smtp.clientId !== 'string') {
    throw new Error('Config must have an smtp.clientId string');
  }

  if (typeof config.smtp.user !== 'string') {
    throw new Error('Config must have an smtp.user string');
  }

  if (typeof config.smtp.clientSecret !== 'string') {
    throw new Error('Config must have an smtp.clientSecret string');
  }

  if (typeof config.smtp.refreshToken !== 'string') {
    throw new Error('Config must have an smtp.refreshToken string');
  }

  if (typeof config.smtp.accessToken !== 'string') {
    throw new Error('Config must have an smtp.accessToken string');
  }

  if (typeof config.smtp.authType !== 'string') {
    throw new Error('Config must have an smtp.authType string');
  }

  if (typeof config.smtp.service !== 'string') {
    throw new Error('Config must have an smtp.service string');
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
    clientId: env.SMTP_CLIENT_ID,
    user: env.SMTP_USER,
    clientSecret: env.SMTP_CLIENT_SECRET,
    accessToken: env.SMTP_ACCESS_TOKEN,
    refreshToken: env.SMTP_REFRESH_TOKEN,
    service: env.SMTP_SERVICE,
    authType: env.SMTP_AUTH_TYPE,
  },
};

validateConfig(config);

export default config as Config;
