import * as userRepository from './user';
import * as authFlowRepository from './auth_flow';
import * as sessionRepository from './session';
import * as thoughtRepository from './thoughts';
import * as feedRepository from './feed';

const repositories = {
  user: userRepository,
  authFlow: authFlowRepository,
  session: sessionRepository,
  thought: thoughtRepository,
  feed: feedRepository,
};

export default repositories;
