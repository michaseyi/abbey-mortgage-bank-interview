import * as userRepository from './user';
import * as authFlowRepository from './auth_flow';
import * as sessionRepository from './session';

const repositories = {
  user: userRepository,
  authFlow: authFlowRepository,
  session: sessionRepository,
};

export default repositories;
