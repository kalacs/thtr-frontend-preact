const makeFrontendApp = require("./index");
const appConfig = require("./config.json");
const frontendApp = makeFrontendApp(appConfig);
frontendApp.start();
