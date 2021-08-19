// Configuration Object
export const config = {
  urlApi:
    window.injectedEnv.configUrlApi ??
    'https://ppdc-otp-qa.bento-tools.org/api/v4/graphql',
  urlApiBeta:
    window.injectedEnv.configUrlApiBeta ??
    'https://ppdc-otp-qa.bento-tools.org/api/v4/graphql',
  googleTagManagerID: window.injectedEnv.configGoogleTagManagerID ?? null,
};