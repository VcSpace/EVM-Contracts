// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract OtherContract {

    uint256 public _x;

    event Log(uint256 amount, uint gas);

    constructor() {

    }

    function getBalance() view public returns(uint) {
        return address(this).balance;
    }

    function setX(uint256 x) external payable{
        _x = x;
        if(msg.value > 0){
            emit Log(msg.value, gasleft());
        }
    }

    function getX() external view returns(uint x){
        x = _x;
    }

}
