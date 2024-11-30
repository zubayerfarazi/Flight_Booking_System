require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 8000;

const rateLimitWindow = process.env.RATE_LIMIT_WINDOW;
const rateLimitMax = process.env.RATE_LIMIT_MAX;

const mongooseUrl = process.env.MONGOOSE_ATLAS_URL;

const jwtSecretKey = process.env.JWT_SECRET_KEY;
const jwtAccessKey = process.env.JWT_ACCESS_KEY;
const jwtRefreshKey = process.env.JWT_REFRESH_KEY;
const jwtResetPasswordKey = process.env.YOUR_RESET_PASSWORD_KEY;

const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;

const clientUrl = process.env.CLIENT_URI;

module.exports = {
  serverPort,
  rateLimitWindow,
  rateLimitMax,
  mongooseUrl,

  jwtSecretKey,
  smtpUserName,
  smtpPassword,
  clientUrl,
  jwtAccessKey,
  jwtResetPasswordKey,
  jwtRefreshKey,
};
