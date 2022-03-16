// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Vault {

  mapping (address => uint) public deposited;
  address public token;

  constructor(address _token) {
    token = _token;
  }

  function deposit(address user, uint amount) public {
    require(IERC20(token).transferFrom(msg.sender, address(this), amount), "Transfer from error");
    deposited[user] += amount;
  }

  function withdraw(address user, uint amount) public {
    require(deposited[user] >= amount , "insuffient balance");
    require(IERC20(token).transfer( user, amount), "Transfer from err in withdraw");
    deposited[user] -= amount;

  }

}