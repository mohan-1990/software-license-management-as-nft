const { Sequelize, DataTypes, Op } = require('sequelize');

async function init(db_gana) {
    const NFT = db_gana.define('NFT', {
        // Model attributes are defined here
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        tokenId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        ownerAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false
        }
      }, {
        tableName: 'NFT',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deletedAt',
        paranoid: true,
        timestamps: true
      });
      
      // the defined model is the class itself
      console.log(NFT === db_gana.models.NFT); // true

      // Sync the model with database
      await NFT.sync();

      return NFT;
}

async function create(NFT, params) {
    const nft = await NFT.create({
        tokenId: params['tokenId'],
        ownerAddress: params['ownerAddress'],
        description: params['description'],
        image_url: params['image_url'],
        title: params['title'],
        price: params['price'],
        currency: params['currency']
    });

    console.log("New NFT: " + params['tokenId'] + " created successfully.");
    return nft;
}

async function read(NFT, tokenId) {
    const nft = await NFT.findAll({
        where: {
            tokenId: tokenId
        },
        limit: 1
    });

    console.log("Read by tokenId: " + tokenId + ". Result: " + JSON.stringify(nft));

    if(nft instanceof Array) {
        return nft[0];
    }
    else {
        return undefined;
    }
}

async function read2(NFT, ownerAddress, orderDirection='DESC') {
    const nft = await NFT.findAll({
        where: Sequelize.where(Sequelize.fn('lower', Sequelize.col('ownerAddress')),
        Sequelize.fn('lower', ownerAddress)),
        order: [
            ['created_at', orderDirection]
        ]
    });

    console.log("Read by owner address: " + ownerAddress + ". Result: " + JSON.stringify(nft));

    if(nft instanceof Array) {
        return nft;
    }
    else {
        return undefined;
    }
}

async function read3(NFT, tokenIds, orderDirection='DESC') {
    let nfts;
    if(tokenIds.length > 0)
    {
        nfts = await NFT.findAll({
            where: {
                tokenId: {
                    [Op.in]: tokenIds
                }
            }
        });
    }
    else {
        nfts = await NFT.findAll({
            order: [
                ['created_at', orderDirection]
            ]
        });
    }

    console.log("Read all NFTS. Params; tokenIds: " + tokenIds + 
    "Result: " + JSON.stringify(nfts));

    if(nfts instanceof Array) {
        return nfts;
    }
}

async function update(NFT, tokenId, params) {
    const nft = await read(NFT, tokenId);
    if(nft !== undefined) {
        const nftOld = {
            ...nft
        };
        await nft.set({
            ...params
        });
        let response = await nft.save();
        console.log("NFT tokenId: " + tokenId + " upated. Update flag: " + response + ". Nft old: " + 
        JSON.stringify(nftOld) + ". NFT new: " + JSON.stringify(nft));
    }
    else {
        return undefined;
    }
}

async function update2(NFT, tokenId, newOwnerAddress) {
    const nft = await read(NFT, tokenId);
    if(nft !== undefined) {
        const nftOld = {
            ...nft
        };
        await nft.set({
            ownerAddress: newOwnerAddress
        });
        let response = await nft.save();
        console.log("NFT tokenId: " + tokenId + " upated. Update flag: " + response + ". Nft old: " + 
        JSON.stringify(nftOld) + ". NFT new: " + JSON.stringify(nft));
    }
    else {
        return undefined;
    }
}

async function delete2(NFT, tokenId) {
    const response = await NFT.destroy({
        where: {
            tokenId: tokenId
        }
    });

    console.log("Delete by tokenId: " + tokenId + ". Result: " + JSON.stringify(response));

    return response;
}

module.exports = {
    init: init,
    create: create,
    read: read,
    read2: read2,
    read3: read3,
    update: update,
    update2: update2,
    delete: delete2
}

