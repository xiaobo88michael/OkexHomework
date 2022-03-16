let {ethers} = require("hardhat");
let { writeAddr } = require('./artifact_log.js');

async function main() {
  // await run('compile');
  let [owner, second] = await ethers.getSigners();

  let Token = await ethers.getContractFactory("Token");
  let Amount = ethers.utils.parseUnits("0", 18);
  let mytoken = await Token.deploy(
    "mytoken",
    "MKT",
    Amount);

  await mytoken.deployed();
  console.log("mytoken:" + mytoken.address);


  let vault = await ethers.getContractFactory("Vault");
  let Vault = await vault.deploy(
    mytoken.address);

  await Vault.deployed();
  console.log("Vault:" + vault.address);
  // await writeAddr(pool.address, "Pool", network.name)


  let aAmount = ethers.utils.parseUnits("10000", 18);
  await mytoken.mint(aAmount)
  await mytoken.approve(vault.address, aAmount)




}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
