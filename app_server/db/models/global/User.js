const { Sequelize, DataTypes, Model } = require('sequelize');

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
        paranoid: true
      });
      
      // the defined model is the class itself
      console.log(User === db_global.models.User); // true

      // Sync the model with database
      await User.sync();

      return User;
}

async function create(User, params) {
    const user = await User.create({
        firstName: params['firstName'],
        lastName: params['lastName'],
        emailId: params['emailId'],
        phone: params['phone'],
        password: params['password']
    });

    console.log("New user: " + emailId + " created successfully.");
    return user;
}

async function read(User, emailId) {
    const user = User.findAll({
        where: {
            emailId: emailId
        }
    });

    console.log("Read by emailId: " + emailId + ". Result: " + JSON.stringify(user));
    
}

async function read2(User, phone) {
    const user = User.findAll({
        where: {
            phone: phone
        }
    });

    console.log("Read by phone: " + phone + ". Result: " + JSON.stringify(user));
    
}

async function delete2(User, emailId) {
    const user = await read(User, emailId);
    if(user instanceof User) {
        const response = await user.destroy();
        console.log("Delete user by emailId: " + emailId + ". Result: " + response);
    }
    
}

module.exports = {
    init: init,
    create: create,
    read: read,
    read2: read2,
    delete: delete2
}

