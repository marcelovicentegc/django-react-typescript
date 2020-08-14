export function getSecrets() {
  const NODE_ENV = process.env.NODE_ENV;
  const AUTH_TOKEN = process.env.AUTH_TOKEN;
  const GTAG_ID = process.env.GTAG_ID;

  return { NODE_ENV, AUTH_TOKEN, GTAG_ID };
}
