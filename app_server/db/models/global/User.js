const { Sequelize, DataTypes, Model } = require('sequelize');

class User extends Model {}

async function init(db_global) {
    const User = db_global.define('User', {
        // Model attributes are defined here
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        emailId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
      }, {
        // Other model options go here
      });
      
      // the defined model is the class itself
      console.log(User === db_global.models.User); // true

      // Sync the model with database
      await User.sync();

      return User;
}

module.exports = {
    init: init
}

