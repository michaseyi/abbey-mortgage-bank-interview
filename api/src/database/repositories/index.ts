import * as userRepository from './user';
import * as authFlowRepository from './auth_flow';

const repositories = {
  user: userRepository,
  authFlow: authFlowRepository,
};

export default repositories;
