const micro = require("micro");
const { send } = micro;
const handler = require("serve-handler");
const { router, get } = require("microrouter");
const appConfig = {
  frontend: {
    scraperUrl: "http://192.168.0.124:3000/scraper",
    torrentsUrl: "http://192.168.0.124:3000/torrents",
    movieAPIUrl: "https://api.themoviedb.org/3/",
    movieAPIKey: "9f1ffd64abd4bde18614fd9087d87d71",
  },
  backend: {
    port: 3001,
    host: "192.168.0.124",
  },
};

const getConfig = (req, res) => send(res, 200, appConfig.frontend);
const staticHandler = async (request, response) => {
  return await handler(request, response, {
    public: `${__dirname}/build`,
  });
};

const routes = router(get("/config", getConfig), get("/*", staticHandler));
const server = micro(routes);

server.listen(appConfig.backend.port, appConfig.backend.host, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(
    `Serving frontend... @${appConfig.backend.host}:${appConfig.backend.port}`
  );
});
