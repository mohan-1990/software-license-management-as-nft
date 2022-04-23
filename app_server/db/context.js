const { Sequelize } = require('sequelize');
const User = require('./models/global/User');
const NFT = require('./models/gana/NFT');
const PendingTransfer = require('./models/gana/PendingTransfer');

const global = new Sequelize({
    dialect: 'sqlite',
    storage: './db/global.sqlite3',
    logging: console.log
});

const gana = new Sequelize({
    dialect: 'sqlite',
    storage: './db/gana.sqlite3',
    logging: console.log
});

let models = {
    global: {},
    gana: {}
};

async function init() {
    try {
        await global.authenticate();
        console.log('Connection has been established successfully to database: global.');
        models.global['User'] = await User.init(global);
    } catch (error) {
        console.error('Unable to connect to the database: global', error);
    }

    try {
        await gana.authenticate();
        console.log('Connection has been established successfully to database: gana.');
        models.gana['NFT'] = await NFT.init(gana);
        models.gana['PendingTransfer'] = await PendingTransfer.init(gana);
    } catch (error) {
        console.error('Unable to connect to the database: gana', error);
    }
}

async function close() {
    try {
        await global.close();
        console.log('Connection closed to database: global.');
    }
    catch (error) {
        console.error('Some error when closing connection to the database: global', error);
    }

    try {
        await gana.close();
        console.log('Connection closed to database: gana.');
    }
    catch (error) {
        console.error('Some error when closing connection to the database: gana', error);
    }
}

module.exports = {
    init: init,
    close: close,
    models: models
}