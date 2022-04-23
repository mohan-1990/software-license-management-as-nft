const global = require('./global/global');
const gana = require('./gana/gana');
const routePrefixGlobal = "/api/v1/global/";
const routePrefixToken = "/api/v1/token/";

async function init(app) {
    await global.init(app, routePrefixGlobal);
    await gana.init(app, routePrefixToken);
}

module.exports = {
    init: init
}