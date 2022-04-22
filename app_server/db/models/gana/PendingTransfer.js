const { Sequelize, DataTypes, Model } = require('sequelize');

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
            allowNull: false,
            unique: true
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
        // Other model options go here
      });
      
      // the defined model is the class itself
      console.log(PendingTransfer === db_gana.models.PendingTransfer); // true

      // Sync the model with database
      await PendingTransfer.sync();

      return PendingTransfer;
}

module.exports = {
    init: init
}

