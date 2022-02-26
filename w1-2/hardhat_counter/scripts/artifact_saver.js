const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
//const writeLog= util.promisify(fs.writeLog);


async function writeAbiAddr(artifacts, addr, name, network) {

    const deployments = {};
    deployments["address"] = addr;
    deployments["contractName"] = artifacts.contractName;
    await writeLog(deployments, name, network);

    const abis = {};
    abis["constractName"] = artifacts.constractName;
    abis["abi"] = artifacts.abi;

    const deploymentPath = path.resolve(__dirname, `../deployments/abi/${abis["contractName"]}.json`);
    
    await writeFile(deploymentPath, JSON.stringify(abis, null, 2));

}


async function writeLog(deployments, name, network) {
    const deploymentPath = path.resolve(__dirname, `../deployments/${network}/${name}.json`);
    await writeFile(deploymentPath, JSON.stringify(deployments, null, 2));
    console.log(`Exported deployments into ${deploymentPath}`);

}



module.exports = {writeAbiAddr, writeLog}

