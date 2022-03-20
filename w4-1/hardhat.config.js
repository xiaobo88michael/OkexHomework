require("@nomiclabs/hardhat-waffle");

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

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
  solidity: {
    compilers: [

      { version: "0.5.16"},
      { version: "0.6.2"},
      { version: "0.6.6"},


    ]
  },

  networks: {
    dev: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },

    ropsten: {
      url: "https://ropsten.infura.io/v3/548f7915bd894af0b71af3181f360e28",
      accounts: {
        mnemonic: mnemonic,
      }
    }
  }
};

