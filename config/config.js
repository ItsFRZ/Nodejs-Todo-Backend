require('dotenv').config();

const appConfig = {};

appConfig.port = process.env.PORT;
appConfig.host = process.env.HOST;
appConfig.allowedCorsOrigin = process.env.CORS;
appConfig.apiVersion = process.env.API;
appConfig.secret = process.env.SECRET;
appConfig.env = process.env.ENV;
appConfig.db = {
    url : process.env.URL
}

module.exports = {
    port : appConfig.port,
    host : appConfig.host,
    cors : appConfig.allowedCorsOrigin,
    api : appConfig.apiVersion,
    env : appConfig.env,
    db : appConfig.db,
    secret : appConfig.secret
}