//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract B {
    uint public num;
    address public sender;

    // call setVars(), 改变Contract C
    function callSetVars(address _addr, uint _num) external payable{
        (bool success, bytes memory data) = _addr.call(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }

    // delegatecall setVars(), 改变Contract B
    function delegatecallSetVars(address _addr, uint _num) external payable{
        (bool success, bytes memory data) = _addr.delegatecall(
            abi.encodeWithSignature("setVars(uint256)", _num)
        );
    }
}