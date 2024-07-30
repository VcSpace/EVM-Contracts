// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract QTOKEN is ERC20 {
    uint256 public maxSupply;

    constructor(uint256 _maxSupply) ERC20("QToken", "QTK") {
        maxSupply = _maxSupply;
    }

    function claim(uint256 amount) public {
        require(totalSupply() + amount <= maxSupply, "Mint amount exceeds max supply");
        require(amount <= 1000000 * 10 ** 18, "amount <=");
        _mint(msg.sender, amount);
    }
}
