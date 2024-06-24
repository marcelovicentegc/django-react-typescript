export function getSecrets() {
  const nodeEnv = process.env.NODE_ENV;
  const authToken = process.env.AUTH_TOKEN;
  const isProd = nodeEnv === "production";

  return { nodeEnv, authToken, isProd };
}
