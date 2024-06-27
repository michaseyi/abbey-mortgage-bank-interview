import repositories from '../database/repositories';

export async function startEmailSignInFlow(email: string): Promise<string> {
  const token = 1; // generate token
  const authFlow = await repositories.authFlow.createAuthFlow({ email, token });
  return authFlow.id;
}
