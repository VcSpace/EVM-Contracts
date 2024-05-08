// SPDX-License-Identifier: MIT
/**
 * @dev 逻辑合约，执行被委托的调用
 */

pragma solidity ^0.8.21;
contract Logic {
    address public implementation; // 与Proxy保持一致，防止插槽冲突
    uint public x = 99;
    event CallSuccess(); // 调用成功事件

    // 这个函数会释放CallSuccess事件并返回一个uint。
    // 函数selector: 0xd09de08a
    function increment() external returns(uint) {
        emit CallSuccess();
        return ++x;
    }
}