const { Sequelize, DataTypes, Model, Op } = require('sequelize');

async function init(db_gana) {
    const PendingTransfer = db_gana.define('PendingTransfer', {
        // Model attributes are defined here
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tokenId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ownerAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requesterAddress: {
            type: DataTypes.STRING,
            allowNull: false 
        },
        message: {
            type: DataTypes.STRING
        }
      }, {
        tableName: 'PendingTransfer',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        paranoid: true,
        timestamps: true
      });
      
      // the defined model is the class itself
      console.log(PendingTransfer === db_gana.models.PendingTransfer); // true

      // Sync the model with database
      await PendingTransfer.sync();

      return PendingTransfer;
}

async function create(PendingTransfer, params) {
    const pendingTransfer = await PendingTransfer.create({
        tokenId: params['tokenId'],
        ownerAddress: params['ownerAddress'],
        requesterAddress: params['requesterAddress'],
        message: params['message']
    });

    console.log("New pending transfer created for tokenId : " + params['tokenId'] + " successfully.");
    return pendingTransfer;
}

async function read(PendingTransfer, field, address) {
    let pendingTransfer;
    console.log("Field; " + field);
    if(field === null || field === undefined || field === "") {
        console.log("Inside undefined");
        pendingTransfer = await PendingTransfer.findAll({
            where: {
                [Op.or]: [
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("requesterAddress")), 
                        Sequelize.fn('lower', address)),
                    Sequelize.where(Sequelize.fn('lower', Sequelize.col("ownerAddress")), 
                    Sequelize.fn('lower', address))
                ]
            }
        });
    }
    else {
        console.log("Inside normal");
        pendingTransfer = await PendingTransfer.findAll({
            where: Sequelize.where(Sequelize.fn('lower', Sequelize.col(field)),
            Sequelize.fn('lower', address))
        });
    }

    console.log("Read Pending Transfer where : " + field + " = " + address + " " + JSON.stringify(pendingTransfer));
    return pendingTransfer;
}

async function update(PendingTransfer, tokenId, message) {
    const pendingTransfer = await read(PendingTransfer, tokenId);
    if(pendingTransfer !== undefined) {
        const pendingTransferOld = {
            ...pendingTransfer
        };
        await pendingTransfer.set({
            message: message
        });
        let response = await pendingTransfer.save();
        console.log("PendingTransfer tokenId: " + tokenId + " upated. Update flag: " + response + ". PendingTransfer old: " + 
        JSON.stringify(pendingTransferOld) + ". PendingTransfer new: " + JSON.stringify(pendingTransfer));
    }
    else {
        return undefined;
    }
}

async function delete2(PendingTransfer, tokenId) {
    const pendingTransfer = await read(PendingTransfer, tokenId);
    if(pendingTransfer !== undefined) {
        let response = await pendingTransfer.destroy();
        console.log("Pending Trasfer deleted by tokenId: " + tokenId + ". Result: " + JSON.stringify(response));
    }
    else {
        return undefined;
    }
}

module.exports = {
    init: init,
    create: create,
    read: read,
    update: update,
    delete: delete2
}

