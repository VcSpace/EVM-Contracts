// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MyToken is ERC721, Ownable {
    string public baseTokenURI;
    uint256 public minted;
    bytes32 public MerkleRoot; // Merkle树的根
    mapping(address => bool) public mintedAddress;   // 记录已经mint的地址
    bool public whitelistMintEnabled = true;
    uint256 public mintPrice = 0.000001 ether;
    uint256 _timelockTime = 1711805400;

    constructor(address owner, bytes32 root)  ERC721("ARB1MyNFT", "ARB1MTK") Ownable(owner) {
        baseTokenURI = "ipfs://Qmb5BBkm6HYWe7yvEGi4uzCPADGuM9nse7KbXVUpbhMNRu/";
        MerkleRoot = root;
    }

    function setTokenURI(string memory _tokenURI) external onlyOwner {
        baseTokenURI = _tokenURI;
    }

    function setMerkleRoot(bytes32 root) external onlyOwner {
        MerkleRoot = root;
    }

    function setWLMintEnabled(bool enable) public onlyOwner {
        whitelistMintEnabled = enable;
    }

    function setlockTime(uint256 timestamp) external onlyOwner {
        _timelockTime = timestamp;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Potential place to append the token ID to the base URI for unique metadata per token
        // For now, it simply returns the base URI for all tokens
        // return baseTokenURI;
        return string(abi.encodePacked(baseTokenURI, Strings.toString(tokenId), ".json"));
    }

    function _withdraw(uint256 amount) public payable onlyOwner {
        require(msg.sender == owner(), "Only the owner can withdraw");
        payable(owner()).transfer(amount);
    }

    function _withdrawAll() public payable onlyOwner {
        require(msg.sender == owner(), "Only the owner can withdraw");
        payable(owner()).transfer(address(this).balance);
    }

    function mintNFT(uint256 amount, bytes32[] calldata proof) external payable {
        require(whitelistMintEnabled, "The whitelist sale is not enabled!");
        require(!mintedAddress[msg.sender], "Address already claimed!");
        require(msg.value >= mintPrice * amount, "Ether sent is not correct");
        require(_verify(_leaf(msg.sender), proof), "Invalid merkle proof"); // Merkle检验通过
        require(block.timestamp >= _timelockTime, "No TIME");
        while (amount > 0 && amount <= 5) {
            minted++;
            _safeMint(msg.sender, minted);
            amount--;
        }
        mintedAddress[msg.sender] = true;
    }

    // 计算Merkle树叶子的哈希值
    function _leaf(address account)
    internal pure returns (bytes32)
    {
        return keccak256(abi.encodePacked(account));
    }

    // Merkle树验证，调用MerkleProof库的verify()函数
    function _verify(bytes32 leaf, bytes32[] memory proof)
    internal view returns (bool)
    {
        return MerkleProof.verify(proof, MerkleRoot, leaf);
    }

}
