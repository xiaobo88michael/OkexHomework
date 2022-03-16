let {ethers} = require("hardhat");
let { writeAddr } = require('./artifact_log.js');

async function main() {
  // await run('compile');
  let [owner, second] = await ethers.getSigners();

  let Token = await ethers.getContractFactory("myNFT");

  let myNFT = await Token.deploy(
    "myNFT",
    "MNT");

  await myNFT.deployed();
  console.log("mytoken:" + myNFT.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
