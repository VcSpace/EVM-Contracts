// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyNFT is ERC721, Ownable {
    string public baseTokenURI;
    uint256 public minted;
    bytes32 public MerkleRoot;
    mapping(address => bool) public mintedAddress;

    constructor(address owner)  ERC721("MNFT", "MNFT") Ownable(owner) {
        baseTokenURI = "ipfs:///";
    }

    function setTokenURI(string memory _tokenURI) external onlyOwner {
        baseTokenURI = _tokenURI;
    }

    function setMerkleRoot(bytes32 root) external onlyOwner {
        MerkleRoot = root;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId), ".json"));
    }

    function _withdrawAll() public payable onlyOwner {
        require(msg.sender == owner(), "Only the owner can withdraw");
        payable(owner()).transfer(address(this).balance);
    }

    function mintNFT(address account) external returns (uint256 nftid) {
        minted++;
        _safeMint(account, minted);
        return minted;
    }

    function _leaf(address account)
    internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(account));
    }

    function _verify(bytes32 leaf, bytes32[] memory proof)
    internal view returns (bool)
    {
        return MerkleProof.verify(proof, MerkleRoot, leaf);
    }

}