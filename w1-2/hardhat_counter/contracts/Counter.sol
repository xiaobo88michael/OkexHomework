// SPDX-License-Identifier: SimPL-2.0

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {

    uint public counter;

    constructor (uint x) {
        counter = x;
    }

    function count() public {
        counter = counter + 1;
        console.log("curr counter:", counter);
    }
}