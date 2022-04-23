const { Sequelize, DataTypes, Model } = require('sequelize');

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

module.exports = {
    init: init
}

