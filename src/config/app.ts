import { env } from "./environment";

export const appConfig = Object.freeze({
  name: env.APP_NAME,
  environment: env.NODE_ENV,
  baseDomain: env.APP_BASE_DOMAIN,
  tenantHostMode: env.TENANT_HOST_MODE,
});
