// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./MYNFT.sol";


contract TokenSwap is Ownable {
    IERC20 public token;
    MyNFT public nft;
    uint256 public tokenAmount;
    uint256 public TokenId;
    mapping(address => bool) public swapAddress;

    event Swap(address indexed user, uint256 nftId);

    constructor(address _token, address _nft, uint256 _tokenAmount, address _owner) Ownable(_owner) {
        token = IERC20(_token);
        nft = MyNFT(_nft);
        tokenAmount = _tokenAmount;
        TokenId = 1; // Assuming the NFT IDs start from 1
    }

    function swap() external payable {
        require(token.transferFrom(msg.sender, address(this), tokenAmount), "Token transfer failed");

        uint256 nftid = nft.mintNFT(msg.sender);

        emit Swap(msg.sender, nftid);
    }

    function setTokenAmount(uint256 _tokenAmount) external onlyOwner {
        tokenAmount = _tokenAmount;
    }
}
