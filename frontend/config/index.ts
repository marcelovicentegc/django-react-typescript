export function getSecrets() {
  const NODE_ENV = process.env.NODE_ENV;
  const AUTH_TOKEN = process.env.AUTH_TOKEN;

  return { NODE_ENV, AUTH_TOKEN };
}
