require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ethers } = require('ethers');
const contractABI = require('./abi.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC_URL);
const url = "https://arbitrum-sepolia.infura.io/v3/"

const provider = new ethers.JsonRpcProvider(url+process.env.INFURA_API_KEY)
// const provider = new ethers.AlchemyProvider("arb-sepolia", process.env.ALCHEMY_API_KEY)
const wallet = new ethers.Wallet(process.env.SEPOLIA_PRIVATE_KEY, provider);

app.get('/', (req, res) => res.send('NFT Minting Backend is running!'));

const contractFactory = new ethers.ContractFactory(contractABI.abi, contractABI.bytecode, wallet);



app.post('/deployContract', async (req, res) => {
    try {
        const address = process.env.CONTRACT_ADDRESS;
        res.json({ address: address });
    } catch (error) {
        console.error('Deployment Error:', error);
        res.status(500).send('Failed to deploy contract');
    }
});



async function mintNFT(contract, chainId, contractAddress) {
    // let nonce = await provider.getTransactionCount(newWallet.address, 'latest');
    let maxRetries = 5;
    let attempt = 1;
    // while (attempt < maxRetries) {
        try {
            const mintPrice = ethers.parseEther("0.0000001")

            const tx = await contract.publicMint(maxRetries,{ value: mintPrice * BigInt(maxRetries) });
            // const tx = await contract.spMintNFT(maxRetries);
            // let a = [1,2,3,4,5]
            // const tx = await contract.burnNFTtoToken(a);
            await tx.wait();
            return { transactionHash: tx.hash };
        } catch (error) {
            console.log(`Attempt ${attempt + 1}: Error minting NFT for wallet `, error);
            if (error.code === 'NONCE_EXPIRED' || error.message.includes('nonce too low')) {
                // nonce++;  // Increment nonce and retry
            } else {
                throw error;  // For any other error, break and throw
            }
        }
        // attempt++;
    // }
    throw new Error('Max retries reached for minting NFT');
}



app.post('/mintMultipleNfts', async (req, res) => {
    try {

        const contractAddress = req.body.contractAddress;
        const contract = new ethers.Contract(contractAddress, contractABI.abi, wallet);

        let results = [];

        // for (let i = 1; i <= 3; i++) {

            // Create a new wallet
            // const nonce = await provider.getTransactionCount(newWallet.address, 'latest'); // Get the current nonce
            const chainId = await provider.getNetwork().then(net => net.chainId);
            console.log("chainId", chainId, "contractAddress", contractAddress)

            // const signature = await generateSignature(newWallet, tokenId, tokenURI, contractAddress, chainId);

            try {
                const result = await mintNFT(contract, chainId, contractAddress);
                results.push(result);
                // results.push({ walletAddress: newWallet.address, tokenId, tokenURI, transactionHash: tx?.hash });
            } catch (error) {
                console.log(`Error minting NFT for wallet:`, error);
                // const result = await mintNFT(contract, chainId, contractAddress);
                // results.push(result);
            }
        // }

        res.json(results);
    } catch (error) {
        console.log('Error minting multiple NFTs:', error);
    }
});


// default route with saying server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});


// More endpoints will be added here
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
