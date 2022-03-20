let {ethers} = require("hardhat");
let { writeAddr } = require('./artifact_log.js');

async function main() {
  // await run('compile');
  let [owner, second] = await ethers.getSigners();
  console.log("owner:", owner.address);
  console.log("second:", second.address);


  let Token = await ethers.getContractFactory("myToken");
  let Anum = ethers.utils.parseUnits("10000", 18);
  let Acoin = await Token.deploy("Acoin", "Acoin", Anum);

  await Acoin.deployed();

  console.log("Acoin:" + Acoin.address);


   let myTokenMarket = await ethers.getContractFactory("MyTokenMarket");

   let routerAddr = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
   let wethAddr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    let market = await myTokenMarket.deploy(
        Acoin.address,
        routerAddr,
        wethAddr,
    );

    await market.deployed();
    console.log("market:" + market.address);

    await Acoin.approve(market.address, ethers.constants.MaxUint256);
    console.log("approve successful");

    let ethAmount = ethers.utils.parseUnits("200", 18);
    await market.AddLiquidity(Anum, { value: ethAmount })
    console.log("添加流动性");

    let b = await Acoin.balanceOf(owner.address);
    console.log("持有token:" + ethers.utils.formatUnits(b, 18));

    let buyEthAmount = ethers.utils.parseUnits("10", 18);
    out = await market.buyToken("0", { value: buyEthAmount })

    b = await Acoin.balanceOf(owner.address);
    console.log("购买到:" + ethers.utils.formatUnits(b, 18));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
