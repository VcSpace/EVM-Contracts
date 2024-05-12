// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 简单的可升级合约
contract SimpleUpgrade {
    address public implementation; // 逻辑合约地址
    address public admin;
    string public words;

    constructor(address _implementation){
        admin = msg.sender;
        implementation = _implementation;
    }

    // 委托调用
    fallback() external payable {
        (bool success, bytes memory data) = implementation.delegatecall(msg.data);
    }

    // 升级合约
    function upgrade(address newImplementation) external {
        require(msg.sender == admin);
        implementation = newImplementation;
    }
}