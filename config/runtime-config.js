/**
 * Configuration template file to bind specific properties to environment variables.
 * All values must have the prefix $VUE_APP_.
 * Their corresponding environment variable key labels must be the values without the $ character.
 * This object should be structurally identical (name and path) to the standard configuration file.
 */
export default {
  title: '$VUE_APP_TITLE',
  description: '$VUE_APP_DESCRIPTION',
  keywords: '$VUE_APP_KEYWORDS',
  api: {
    baseUrl: '$VUE_APP_API_BASE_URL',
    gazetteerBaseUrl: '$VUE_APP_API_GAZETTEER_BASE_URL',
    uploadBaseUrl: '$VUE_APP_API_UPLOAD_BASE_URL',
    matomoUrl: '$VUE_APP_API_MATOMO_URL',
    authToken: '$VUE_APP_API_AUTH_TOKEN',
  },
  useAuthService: '$VUE_APP_USE_AUTH_SERVICE',
  keycloak: {
    enableLogin: '$VUE_APP_KEYCLOAK_ENABLE_LOGIN',
    realm: '$VUE_APP_KEYCLOAK_REALM',
    url: '$VUE_APP_KEYCLOAK_URL',
    'ssl-required': '$VUE_APP_KEYCLOAK_SSL_REQUIRED',
    clientId: '$VUE_APP_KEYCLOAK_CLIENT_ID',
    'public-client': '$VUE_APP_KEYCLOAK_PUBLIC_CLIENT',
    'verify-token-audience': '$VUE_APP_KEYCLOAK_VERIFY_TOKEN_AUDIENCE',
    'use-resource-role-mappings': '$VUE_APP_KEYCLOAK_USE_RESOURCE_ROLE_MAPPINGS',
    'confidential-port': '$VUE_APP_KEYCLOAK_CONFIDENTIAL_PORT',
  },
  rtp: {
    grand_type: '$VUE_APP_RTP_GRAND_TYPE',
    audience: '$VUE_APP_RTP_AUDIENCE',
  },
  routerOptions: {
    base: '$VUE_APP_ROUTER_OPTIONS_BASE',
    mode: '$VUE_APP_ROUTER_OPTIONS_MODE',
  },
};
