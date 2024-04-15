// src/App.js
import React, { useState } from 'react';
import ConnectWallet from './components/ConnectWallet';
import DeployContract from './components/DeployContract';
import MintMultipleNfts from './components/MintMultipleNFT';
import "./index.css"
import NFTCard from './components/NFTCard';

function App() {
  const [signer, setSigner] = useState(null);
  const [contractAddress, setContractAddress] = useState();
  const [walletAddress, setWalletAddress] = useState("")
  const [chainId, setChainId] = useState()
  const [data, setData] = useState([])


  return (
    <div>
      <div class="bg">
        <h2>Gaseless NFT</h2>
      </div>
      wallet address: {(walletAddress && signer) ? walletAddress : 'No wallet connected'}
      <h2>{
        contractAddress
          ? `Contract deployed at: ${contractAddress}`
          : 'Connect wallet and deploy contract'

      }
      </h2>
      {
        !walletAddress && !signer && (
          <ConnectWallet setChainId={setChainId} setWalletAddress={setWalletAddress} setSigner={setSigner} />
        )
      }
      {
        (walletAddress && !contractAddress) &&
        <DeployContract setContractAddress={setContractAddress} />
      }
      {/* {(contractAddress && chainId && walletAddress) && <MintNFT chainId={chainId} signer={signer} contractAddress={contractAddress} />} */}
      {(contractAddress && chainId && walletAddress && data.length === 0) && <MintMultipleNfts chainId={chainId} signer={signer} contractAddress={contractAddress} data={data} setData={setData} />}

      <div className='grid'>
        {
          data?.map((nft, index) => (
            <NFTCard contractAddress={contractAddress} key={index} tokenId={nft.tokenId} tokenURI={nft.tokenURI} transactionHash={nft.transactionHash} walletAddress={nft.walletAddress} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
