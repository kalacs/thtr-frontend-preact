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
      rewrites: [
        { source: "/movies/:id", destination: `/index.html` },
        { source: "/movies", destination: `/index.html` },
        { source: "/player", destination: `/index.html` },
      ],
    });
  };

  const routes = router(get("/config", getConfig), get("/*", staticHandler));
  let server = micro(routes);

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
    async stop() {
      if (server) await promisify(server.close.bind(server))();
      server = null;
      return true;
    },
  };
};
