// src/components/ConnectWallet.js
import React from 'react';
import { ethers } from 'ethers';

let signer;
let provider;
function ConnectWallet({ setSigner, setWalletAddress, setChainId }) {
    const connectWalletHandler = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log("Signer:", signer)
            const network = await provider.getNetwork();
            setChainId(network.chainId);
            console.log("Network:", Number(network.chainId))

            setSigner(signer);
            console.log("conencted wallet:", signer.address)
            const walletAddress = signer.address
            setWalletAddress(walletAddress);
        } catch (error) {
            console.log("Error connecting wallet:", error)
        }
    };

    return (
        <button className='button-outline' onClick={connectWalletHandler}>Connect Wallet</button>
    );
}

export default ConnectWallet;
