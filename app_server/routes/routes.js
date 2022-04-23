const user = require('./global/user');
const gana = require('./gana/gana');
const routePrefixGlobal = "/api/v1/global/";
const routePrefixToken = "/api/v1/token/";

async function init(app) {
    await user.init(app, routePrefixGlobal);
    await gana.init(app, routePrefixToken);
}

module.exports = {
    init: init
}