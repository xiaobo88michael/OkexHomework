require("@nomiclabs/hardhat-waffle");

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: 'https://ropsten.infura.io/v3/548f7915bd894af0b71af3181f360e28',
      accounts: {
        mnemonic: mnemonic,
      } 
    }
  }
};
