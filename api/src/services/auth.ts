import { generateToken } from '../utils/tokens';
import repositories from '../database/repositories';
import { sendEmail } from '../utils/mailer';
import templates from '../email_templates';
import { NotFoundError, UnauthorizedError } from '../utils/error';
import { findUser, createUser } from './user';
import db from '../database/db';
import { Session } from '../database/models';

export async function startEmailSignInFlow(email: string): Promise<string> {
  const token = generateToken(6);

  // TODO: Set a timer to delete the auth flow after a certain amount of time
  const authFlow = await repositories.authFlow.createAuthFlow({
    email,
    token,
  });

  // TODO: Handle email sending errors. Await or not?
  sendEmail(
    email,
    'Email Sign In Token',
    templates.verifyEmailSignIn({ token }),
  );

  return authFlow.id;
}

export async function verifyEmailSignInFlow(flowId: string, token: string) {
  const sessionToken = await db.transaction(async (tx) => {
    const authFlow = await repositories.authFlow.findOne({ id: flowId }, tx);

    if (authFlow === null) {
      throw new NotFoundError('Auth flow not found');
    }

    if (authFlow.token !== token) {
      throw new UnauthorizedError('Auth flow token does not match');
    }

    let user = await findUser(undefined, authFlow.email, tx);

    if (user === null) {
      user = await createUser(authFlow.email, tx);
    }

    const session = await repositories.session.createSession(
      {
        userId: user.id,
      },
      tx,
    );

    await repositories.authFlow.deleteAuthFlow({ id: flowId }, tx);

    return session.id;
  });
  return sessionToken;
}

export async function getUserFromSessionToken(sessionToken: string) {
  const session = await repositories.session.findOne({ id: sessionToken });

  if (session === null) {
    throw new UnauthorizedError('Session not found');
  }

  return session.user.id;
}
