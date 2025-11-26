require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    localhost: {
      url: "http://ganache:8545" // compose network içindeki servis ismi
    }
  }
};
