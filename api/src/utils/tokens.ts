export function generateToken(length: number) {
  // TODO: This is just for testing purposes, will switch to a more cryptographically secure method later
  return Math.floor(Math.random() * Math.pow(10, length)).toString();
}
