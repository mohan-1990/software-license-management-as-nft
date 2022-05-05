const db_context = require('../../db/context');
const NFT = require('../../db/models/gana/NFT');
const PendingTransfer = require('../../db/models/gana/PendingTransfer');
const GanaMiddleware = require('../../contract_middleware/gana');
const availableRoutes = [];
const tokenName = "gana";

async function init(app, routePrefix) {
    let route = routePrefix + tokenName + '/new';
    availableRoutes.push({
        path: route,
        method: 'POST'
    });

    await create_NFT(app, route);

    route = routePrefix + tokenName + '/tokens';
    availableRoutes.push({
        path: route,
        method: 'GET'
    });

    await read_NFTs(app, route);

    route = routePrefix + tokenName + '/token';
    availableRoutes.push({
        path: route + '?id=',
        method: 'GET'
    });

    await read_NFTById(app, route);

    route = routePrefix + tokenName + '/tokensof';
    availableRoutes.push({
        path: route + '?owner=',
        method: 'GET'
    });

    await read_NFTByOwnerAddress(app, route);
    
    route = routePrefix + tokenName + '/delete';
    availableRoutes.push({
        path: route,
        method: 'POST'
    });

    route = routePrefix + tokenName + '/reqtokentransfer';
    availableRoutes.push({
        path: route,
        method: 'POST'
    });

    await requestTokenTransfer(app, route);
    
    console.log("Routes for token gana iniitialized.");
    console.log("Available routes: " + JSON.stringify(availableRoutes));
}

async function create_NFT(app, route) {
    app.post(route, async function(req,res) {
        let to = req.body.toAddress;
        let description = req.body.description;
        let image_url = req.body.image_url;
        let title = req.body.title;
        
        if (to != "" && description != "" && image_url != "" &&
        title != "") {

            let newTokenId = await GanaMiddleware.mint(to);

            if(newTokenId == -1 || newTokenId === null) {
                res.status(502);
                res.send("Some error occured in blockchain gateway when minting new token for address: " + to + 
                ". Please try again later or contact support if problem persists.");
            }
            else {
                let params = {
                    tokenId: newTokenId,
                    ownerAddress: to,
                    description: description,
                    image_url: image_url,
                    title: title
                };
                let response = await NFT.create(db_context.models.gana['NFT'], params);
    
                res.status(200);
                res.send("Software license NFT minted successfuly. TokenId: " + newTokenId);
            }
        }  
        else {
            res.status(400);
            res.send("Invalid or missing parameters. Please try again with values for all fields.");
        }    
    });
}

async function read_NFTs(app, route) {
    app.get(route, async function(req,res) {
        let NFTs = await NFT.read3(db_context.models.gana['NFT']);
        res.set('Content-Type', 'application/json');     
        res.status(200);
        res.send(NFTs);   
    });
}

async function read_NFTById(app, route) {
    app.get(route, async function(req,res) {
        let tokenId = req.query['id'];
        let NFT_ = await NFT.read(db_context.models.gana['NFT'], tokenId);
        if(NFT_ !== undefined) {
            res.set('Content-Type', 'application/json');     
            res.status(200);
            res.send(NFT_);
        }
        else {
            res.status(200);
            res.send("Token id: " + tokenId + " not found. Please try again with a valid token id.");
        }  
    });
}

async function read_NFTByOwnerAddress(app, route) {
    app.get(route, async function(req,res) {
        let ownerAddress = req.query['owner'];
        let NFTs = await NFT.read2(db_context.models.gana['NFT'], ownerAddress);
        if(NFTs !== undefined) {
            res.set('Content-Type', 'application/json');     
            res.status(200);
            res.send(NFTs);
        }  
    });
}

async function requestTokenTransfer(app, route) {
    app.post(route, async function(req,res) {
        let tokenId = req.body.tokenId;
        let requesterAddress = req.body.requesterAddress;
        let NFT_ = await NFT.read(db_context.models.gana['NFT'], tokenId);
        if(NFT_ !== undefined) {
            let params = {
                tokenId: tokenId,
                ownerAddress: NFT_['ownerAddress'],
                requesterAddress: requesterAddress,
                message: "Token owner notified"
            };

            let response = await PendingTransfer.create(db_context.models.gana['PendingTransfer'], params);
            res.status(200);
            res.send("The owner of the license token is notified. Please wait for the owner to initiate license token transfer. Maximun wait days: 2");
        }
        else {
            res.status(200);
            res.send("Token id: " + tokenId + " not found. Please try again with a valid token id.");
        }  
    });
}

module.exports = {
    init: init
}