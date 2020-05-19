const makeFrontendApp = require("./index");

const appConfig = {
  frontend: {
    scraperUrl: "http://192.168.0.124:3000/scraper",
    torrentsUrl: "http://192.168.0.124:3000/torrents",
    movieAPIUrl: "https://api.themoviedb.org/3/",
    movieAPIKey: "9f1ffd64abd4bde18614fd9087d87d71",
  },
  backend: {
    port: 3002,
    host: "192.168.0.124",
  },
};
const frontendApp = makeFrontendApp(appConfig);
frontendApp.start();
