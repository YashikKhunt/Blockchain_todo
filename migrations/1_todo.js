const Todo = artifacts.require("Bloc");

module.exports = function (deployer) {
    deployer.deploy(Todo);
};