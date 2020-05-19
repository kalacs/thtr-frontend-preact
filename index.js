const micro = require("micro");
const { send } = micro;
const handler = require("serve-handler");
const { router, get } = require("microrouter");
const { promisify } = require("util");

module.exports = function (config) {
  const getConfig = (req, res) => send(res, 200, config.frontend);
  const staticHandler = async (request, response) => {
    return await handler(request, response, {
      public: `${__dirname}/build`,
    });
  };

  const routes = router(get("/config", getConfig), get("/*", staticHandler));
  const server = micro(routes);

  return {
    start() {
      server.listen(config.backend.port, config.backend.host, (err) => {
        if (err) {
          console.log(err);
          process.exit(1);
        }
        console.log(
          `Serving frontend... @${config.backend.host}:${config.backend.port}`
        );
      });
    },
    stop() {
      const stopServer = promisify(server.close.bind(server));
      return stopServer();
    },
  };
};
