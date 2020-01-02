interface BASE_URL {
  AUTH: string;
}

const DEVBASEURL: BASE_URL = {
  AUTH: 'http://api-dev.auth.com',
}

const UATBASEURL: BASE_URL = {
  AUTH: 'http://api-uat.auth.com',
}

const PRODBASEURL: BASE_URL = {
  AUTH: 'http://api-prod.auth.com',
}

const LOCALBASEURL: BASE_URL = {
  AUTH: 'http://localhost:8080',
}

let BASEURL: BASE_URL;

switch(process.env.APP_STAGE){
  case 'dev':
    BASEURL = DEVBASEURL;
    break;
  case 'uat':
    BASEURL = UATBASEURL;
    break;
  case 'prod':
    BASEURL = PRODBASEURL;
    break;
  default:
    BASEURL = LOCALBASEURL;
    break;
}

export { BASEURL }