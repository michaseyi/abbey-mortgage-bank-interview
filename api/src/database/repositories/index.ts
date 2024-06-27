import * as userRepository from './user';
import * as authFlowRepository from './auth_flow';
import * as sessionRepository from './session';
import * as thoughtRepository from './thoughts';

const repositories = {
  user: userRepository,
  authFlow: authFlowRepository,
  session: sessionRepository,
  thought: thoughtRepository,
};

export default repositories;
