// src/components/MintNFT.js
// src/components/MintNFT.js
import React, { useState } from 'react';
import axios from 'axios';

function MintMultipleNfts({ signer, contractAddress, data, setData }) {
    const [loading, setLoading] = useState(false)

    const mintHandler = async () => {
        if (!signer) {
            alert('Please connect your wallet first.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:3001/mintMultipleNfts', {
                contractAddress
            });
            console.log('NFT minted:', response.data);
            setData(response.data)

        } catch (error) {
            console.error('Error minting NFT:', error);
            alert('Error minting NFT');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <button className='button-primary' disabled={loading} onClick={mintHandler}>{loading ? "Minting... it can take some time" : "Mint Multiple NFTs"}</button>
        </div>
    );
}

export default MintMultipleNfts;

