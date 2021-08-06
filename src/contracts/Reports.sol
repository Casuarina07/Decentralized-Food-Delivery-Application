// SPDX-License-Identifier: Blockchain
pragma solidity ^0.5.16;

contract Reports {
    string public name;

    constructor() public {
        name = "Reports Solidity Contract";
    }

    struct Report {
        uint256 id;
    }
}
