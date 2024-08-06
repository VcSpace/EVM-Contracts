// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyToken is ERC721, Ownable {
    string public baseTokenURI;
    uint256 public minted;
    bytes32 public MerkleRoot; // Merkle树的根
    mapping(address => bool) public mintedAddress;
    uint256 public mintPrice = 0.000001 ether;

    constructor(address owner, bytes32 root)  ERC721("ARB1MyNFT", "ARB1MTK") Ownable(owner) {
        baseTokenURI = "ipfs:///";
        MerkleRoot = root;
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

    function mintNFT(uint256 amount, bytes32[] calldata proof) external payable {
        require(!mintedAddress[msg.sender], "Address already claimed!");
        require(msg.value >= mintPrice * amount, "Ether sent is not correct");
        require(_verify(_leaf(msg.sender), proof), "Invalid merkle proof");
        mintedAddress[msg.sender] = true;
        while (amount > 0) {
            minted++;
            _safeMint(msg.sender, minted);
            amount--;
        }
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
