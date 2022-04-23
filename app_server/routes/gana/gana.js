const db_context = require('../../db/context');
const NFT = require('../../db/models/gana/NFT');
const PendingTransfer = require('../../db/models/gana/PendingTransfer');
const availableRoutes = [];
const tokenName = "gana";

async function init(app, routePrefix) {
    let route = routePrefix + tokenName + '/new';
    availableRoutes.push({
        path: route,
        method: 'POST'
    });
    
    route = routePrefix + tokenName + '/delete';
    availableRoutes.push({
        path: route,
        method: 'POST'
    });

    route = routePrefix + tokenName + '/requestTransfer';
    availableRoutes.push({
        path: route,
        method: 'POST'
    });
    
    console.log("Rotes for token gana iniitialized.");
    console.log("Available routes: " + JSON.stringify(availableRoutes));
}

module.exports = {
    init: init
}