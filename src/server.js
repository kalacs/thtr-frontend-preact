import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import config from "./config.json";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka() // You can also use Express
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    ({ url }, res, next) => {
      if (url === "/config") {
        res
          .writeHead(200, {
            "Content-type": "application/json",
          })
          .end(JSON.stringify(config));
      } else {
        next();
      }
    },
    sapper.middleware()
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
