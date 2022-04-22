const Migrations = artifacts.require("Gana");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
