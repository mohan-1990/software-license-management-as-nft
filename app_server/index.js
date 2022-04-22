const db_context = require('./db/context');
const gana_contract_middleware = require('./contract_middleware/gana');

async function main() {
    // Initiliaze database context and connections
    await db_context.init();

    // Initiliaze contract midleware
    await gana_contract_middleware.init();

    let tc = await gana_contract_middleware.retrieveTransferCounts(1);
    console.log("Transfer counts of tokenId 1:" + tc);

    let th = await gana_contract_middleware.retrieveTransferHistory(1);
    console.log("Transfer history of tokenId 1:" + JSON.stringify(th));

    let contractConstants = await gana_contract_middleware.getContractInstanceConstants();
    let tokenId = await gana_contract_middleware.mint(contractConstants["availabeAccounts"][1]);
    console.log("Newly minted tokenId: " + tokenId);
}

main();