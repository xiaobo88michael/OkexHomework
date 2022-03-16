const { expect } = require("chai");
const { ethers } = require("hardhat");
var mysql = require("mysql");


var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    port: '3306',
    database: 'test'
});


connection.connect();

describe("myNFT", function () {
    it("the test for myNFT.sol ", async function () {
        let [owner, second] = await ethers.getSigners();
        const nft = await ethers.getContractFactory("myNFT",owner);
       // let Amount = ethers.utils.parseUnits("0", 18);
        const mynft = await nft.deploy("myNFT", "MNT");
        await mynft.deployed();

        //NFT创建
        await mynft.createRandomNFT("nft1");
        let nftinfo = await mynft.getNFTs();
        console.log(nftinfo);
        expect(nftinfo[0][0]).to.equal('nft1');




       // expect(balance).to.equal(amount);



    });


});