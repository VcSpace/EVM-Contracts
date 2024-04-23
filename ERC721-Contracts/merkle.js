const {MerkleTree} = require('merkletreejs')

const keccak256 = require('keccak256')


// let whitelistAddresses = [
//     "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
//     "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
//     "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
//     "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
//     "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"
// ]

let whitelistAddresses =     [
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
    "",
    ""
]

//buffer化叶子结点
const leafNodes = whitelistAddresses.map(addr => keccak256(addr))

//实例化默克尔树
const merkleTree = new MerkleTree(leafNodes,keccak256,{sortPairs:true});

//获取根哈希值
const rootHash = merkleTree.getRoot();

console.log('Whitelist Merkle Tree\n',merkleTree.toString())

//定义你所需要验证的地址
const claimingAddress = leafNodes[2]

//取得默克尔树证明
const hexProof = merkleTree.getHexProof(claimingAddress)


console.log(`Merkle Proof for Address is\n`,hexProof)


//当你传入一个错误的白名单地址时
const errAddress = keccak256('0x70997170151812dc3A010C7d01b50e0d17dc79C8');

//取得默克尔证明
const hexProof1 = merkleTree.getHexProof(errAddress)

//将会得到空数组！
// console.log(`Merkle Proof for error Address is\n`,hexProof1)