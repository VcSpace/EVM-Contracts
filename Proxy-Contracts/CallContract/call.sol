// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./aa.sol";

contract CallContract {

    OtherContract public oc;

    constructor (address _Address) {
        oc = OtherContract(_Address);
    }

    function callSetX(address _Address, uint256 x) external{
        OtherContract(_Address).setX(x);
    }

    function callOcSetX(uint256 x) external{
        oc.setX(x);
    }

    function callGetX(OtherContract _Address) external view returns(uint x){
        x = _Address.getX();
    }

    function callGetX2() external view returns(uint x){
        x = oc.getX();
    }

    function setXTransferETH(address otherContract, uint256 x) payable external{
        OtherContract(otherContract).setX{value: msg.value}(x);
    }

}