const Marketplace = artifacts.require("Marketplace");
const Reports = artifacts.require("Reports");

module.exports = function (deployer) {
  deployer.deploy(Marketplace);
  deployer.deploy(Reports);
};
