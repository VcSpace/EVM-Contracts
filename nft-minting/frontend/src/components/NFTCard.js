import React, { useEffect, useState } from 'react'
import "../index.css"
import { truncateEthAddress } from '../utils'

export default function NFTCard({ contractAddress, tokenId, tokenURI, transactionHash, walletAddress }) {
    console.log("contractAddress", contractAddress)
    const [metadata, setMetadata] = useState({})
    const getMetadata = async () => {
        const res = await fetch(tokenURI).then(res => res.json());
        setMetadata(res);
    }
    console.log("tokenURI", "transactionHash", transactionHash, "walletAddress", walletAddress);
    useEffect(() => {
        if (!tokenURI) return;
        getMetadata()
    }, [])


    if(!metadata || !contractAddress || !tokenId) return null;

    return (
        <div class="nft">
            <div class='main'>
                {/*<img class='tokenImage' src={`https://harlequin-far-tyrannosaurus-978.mypinata.cloud/ipfs/${metadata?.image}`} alt="NFT" />*/}
                <h2>{metadata?.name}</h2>
                <p class='description'>{metadata?.description}</p>
                <div class='tokenInfo'>
                    <div class="price">
                        <ins>◘</ins>
                        <a target='_blank' rel='noreferrer' className='description' href={`https://testnets.opensea.io/assets/arbitrum-sepolia/${contractAddress}/${tokenId}`}>
                            View on Opensea
                        </a>
                    </div>
                    <div class="duration">
                        <ins>◷</ins>
                        <p>11 days left</p>
                    </div>
                </div>
                <hr />
                <div style={{ margin: "10px 20px" }} class='wrapper'>
                    <a target='_blank' rel='noreferrer' className='description' href={`https://arbitrum-sepolia.etherscan.io/address/${walletAddress}#nfttransfers`}>Wallet: {truncateEthAddress(walletAddress)}</a>
                </div>
                <div style={{ margin: "10px 20px" }} class='wrapper'>
                    <a target='_blank' rel='noreferrer' className='description' href={`https://arbitrum-sepolia.etherscan.io/tx/${transactionHash}`}>Hash: #{truncateEthAddress(transactionHash)}</a>
                </div>
            </div>
        </div>

    )
}
