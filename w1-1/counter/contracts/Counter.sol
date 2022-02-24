// SPDX-License-Identifier: SimPL-2.0

pragma solidity ^0.8.0;

contract Counter {

    uint public counter;

    constructor () {
        counter = 0;
    }

    function count() public {
        counter = counter + 1;
    }
}