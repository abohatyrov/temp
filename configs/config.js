const appConfig = {
  MEDIA_BASE_URL: "https://media.syodo.com.ua",
  BUCKET_NAME: "media.syodo.com.ua",
  API_NAME: "PUBLIC_API",
  SECURE_API_NAME: "PRIVATE_API",
  API_GATEWAY: "https://e0uf7jciif.execute-api.eu-central-1.amazonaws.com/production",
  API_KEY: "yjhlMaWbxb412floOKrhfaJWiAO9OFh21RTq9X9o",
  Auth: {
    region: "eu-central-1",
    userPoolId: "eu-central-1_x60cdOuyg",
    userPoolWebClientId: "51duis190jkagsfa7jq7imjfa8",
    mandatorySignIn: false,
    authenticationFlowType: "USER_PASSWORD_AUTH",
  },
  CDN: "https://d2bj1fdxpytfk0.cloudfront.net",
  WORKING_HOURS: {
    FROM: "10:00",
    TO: "21:45",
  },
  showNonWorkingMode: false
};

module.exports = {
  appConfig,
};