// SPDX-License-Identifier: MIT
/**
 * @dev Caller合约，调用代理合约，并获取执行结果
 */

pragma solidity ^0.8.21;

contract Caller{
    address public proxy; // 代理合约地址

    constructor(address proxy_){
        proxy = proxy_;
    }

    // 通过代理合约调用increment()函数
    function increment() external returns(uint) {
        ( , bytes memory data) = proxy.call(abi.encodeWithSignature("increment()"));
        return abi.decode(data,(uint));
    }
}