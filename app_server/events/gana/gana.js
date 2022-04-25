const db_context = require('../../db/context');
const NFT = require('../../db/models/gana/NFT');
const PendingTransfer = require('../../db/models/gana/PendingTransfer');
const GanaMiddleware = require('../../contract_middleware/gana');
const zeroAddress = "0x0000000000000000000000000000000000000000";

function init(app, routePrefix) {
    
    GanaMiddleware.subscribeToEvent('Transfer', TransferEvent);
    console.log("Subscribed to Transfer event in Gana contarct middleware.");
}

async function TransferEvent(eventObj) {
    console.log("New transfer event: " + JSON.stringify(eventObj));

    if(eventObj['from'] === zeroAddress) {
        console.log("Gana Transfer Evenet Handler: Ignoring transfer event for newly minted token: " + eventObj['tokenId']);
        return;
    }

    const nft = await NFT.read(db_context.models.gana['NFT'], eventObj['tokenId']);
    if(nft !== undefined) {
        const updateFlag = await PendingTransfer.update(db_context.models.gana['PendingTransfer'], 
        eventObj['tokenId'], "Token transfred by owner: " + eventObj['from'] + " to: " + eventObj['to']);
        const removeFlag = await PendingTransfer.delete(db_context.models.gana['PendingTransfer'], 
        eventObj['tokenId']);
        const updateFlag2 = await NFT.update2(db_context.models.gana['NFT'], eventObj['tokenId'], eventObj['to']);

        console.log("Gana Transfer Evenet Handler: Ownership updated in database for tokenId: " + eventObj['tokenId'] + ". New owner: " + eventObj['to']);
    }
}

module.exports = {
    init: init
}