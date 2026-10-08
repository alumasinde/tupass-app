import { env } from "./environment";

export const appConfig = Object.freeze({
  name: env.APP_NAME,
  url: env.APP_URL,
  environment: env.NODE_ENV,
  rootDomain: env.ROOT_DOMAIN,
  platformHost: env.PLATFORM_HOST,
});
