const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Vault", function () {
    it("Vault test success", async function () {
        let [owner, second] = await ethers.getSigners();
        const token = await ethers.getContractFactory("myERC20token",owner);
       // let Amount = ethers.utils.parseUnits("0", 18);
        const mytoken = await token.deploy("0");
        await mytoken.deployed();
        let amount = ethers.utils.parseUnits("1000", 18);
        console.log(amount)
        await mytoken.mint(amount)
        let balance = await mytoken.totalSupply();
        console.log(balance)
        expect(balance).to.equal(amount);

        const Vault = await ethers.getContractFactory("Vault");
        const vault = await Vault.deploy(mytoken.address);
        await  vault.deployed();

        let vmount = ethers.utils.parseUnits("100", 18);
        await mytoken.approve(vault.address, vmount);
      //  await mytoken.approve(owner.address, vmount);
        let tmount = ethers.utils.parseUnits("10", 18);
        await vault.deposit(owner.address,tmount);
        let ownerbalace = await vault.deposited(owner.address);
        expect(ownerbalace).to.equal(tmount);

        await vault.withdraw(owner.address, tmount);
        let zmount = ethers.utils.parseUnits("0", 18);
        let ownerbalace1 = await vault.deposited(owner.address);
        expect(ownerbalace1).to.equal(zmount);











        //await mytoken.approve()




    });


});