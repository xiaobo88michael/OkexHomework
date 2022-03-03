// SPDX-License-Identifier: SimPL-2.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Bank is Ownable {
    constructor() {

    }

    mapping (address => uint) public accounts;
    address[] public addrs;

    receive () external payable {
        if (accounts[msg.sender] ==0) {
            addrs.push(msg.sender);
        }
        accounts[msg.sender] += msg.value;    
    }

    function withdrawCustomer(uint amount) public {
        uint balance = accounts[msg.sender];
        require(balance >= amount, "this address is very pool, can't withdraw amount eth");
        payable(msg.sender).transfer(amount);
        accounts[msg.sender] -= amount;
    } 

    function withdrawOwner() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
       // accounts = new mapping(address => uint)();
       uint i;
       for (i=0; i<addrs.length; i++) {
           delete accounts[addrs[i]];
       }


    }

    function getCustomerBalance(address addr) public view returns(uint){
        return accounts[addr];
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }
}