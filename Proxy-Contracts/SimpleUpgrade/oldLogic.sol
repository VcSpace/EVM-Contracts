// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// 逻辑合约old
contract Logic1 {
    // 状态变量和proxy合约一致，防止插槽冲突
    address public implementation;
    address public admin;
    string public words;

    function foo() public{
        words = "old";
    }
}