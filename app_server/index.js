const db_context = require('./db/context');
const gana_contract_middleware = require('./contract_middleware/gana');
const routes = require('./routes/routes');
const events = require('./events/events');
var cors = require('cors');

const express = require('express');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

async function main() {
    // Initiliaze database context and connections
    await db_context.init();

    // Initiliaze contract midleware
    await gana_contract_middleware.init();

    // Initiliaze contract event handlers
    events.init();

    // Initialize app server
    await initializeApp();

    // Test middleware to contract connections
    await testMiddlewareToContractConnection();
}

async function initializeApp() {
    const app = express();
    const port = 3000;

    app.use(cors());

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(bodyParser.json());

    // Initialize app routes
    await routes.init(app);

    app.listen(port, () => console.log(`App server listening on port ${port}!`))
}

async function testMiddlewareToContractConnection() {
    let tc = await gana_contract_middleware.retrieveTransferCounts(1);
    console.log("Transfer counts of tokenId 1:" + tc);

    let th = await gana_contract_middleware.retrieveTransferHistory(1);
    console.log("Transfer history of tokenId 1:" + JSON.stringify(th));

    /* let contractConstants = await gana_contract_middleware.getContractInstanceConstants();
    let tokenId = await gana_contract_middleware.mint(contractConstants["availabeAccounts"][1]);
    console.log("Newly minted tokenId: " + tokenId); */
}

main();