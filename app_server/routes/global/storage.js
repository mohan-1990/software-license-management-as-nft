const storage = require('@tweedegolf/storage-abstraction');
const { v4: uuidv4 } = require('uuid');
let availableRoutes = [];

const s = new storage.Storage({
    type: storage.StorageType.LOCAL,
    directory: "../../storage/nft_images",
    mode: 755
});

async function init(app, routePrefix) {
    let route = routePrefix + 'storage';
    await route_UploadFile(app, route);
    availableRoutes.push({
        path: route,
        method: 'POST'
    });
    
    route = routePrefix + 'storage';
    await route_DownloadFile(app, route);
    availableRoutes.push({
        path: route + '?id=',
        method: 'GET'
    });
    
    console.log("Storage routes iniitialized.");
    console.log("Available routes: " + JSON.stringify(availableRoutes));
}

async function route_UploadFile(app, route) {
    app.post(route, async function(req,res) {
        let fileBuffer = req.files.nft_image.data;
    
        if (fileBuffer) {
            let fileId = uuidv4();
            await s.addFileFromBuffer(fileBuffer, fileId);
            res.status(200);
            res.send({
                "fileId": fileId
            });
        }  
        else {
            res.status(400);
            res.send("Invalid or missing file. Please try again with a valid image file.");
        }    
    });
}

async function route_DownloadFile(app, route) {
    app.get(route, async function(req,res) {
        let fileId = req.query.id;
        let fileExists = await s.fileExists(fileId);
        if (fileExists) {
            let fileBuffer = await s.getFileAsReadable(fileId);
            res.status(200);
            fileBuffer.pipe(res);
        }
        else {
            res.status(404);
            res.send("FileId " + fileId + " does not exist. Please try again with a valid file id.");
        }  
    });
}

module.exports = {
    init: init
}