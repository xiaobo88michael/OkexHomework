// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract myERC20token is ERC20, Ownable {

    //uint public Maxsupply;


    constructor(uint256 initialSupply) ERC20("mytoken", "MTK")  {
        _mint(msg.sender, initialSupply);
    }


    function mint( uint256 amount) public {
        // uint256 currentsupply = totalSupply();
        //  require(currentsupply+amount <= Maxsupply, "exceed maxsupply");
        _mint(msg.sender, amount);

    }





}