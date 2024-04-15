// src/components/DeployContract.js
import React, { useState } from 'react';
import axios from 'axios';

function DeployContract({ setContractAddress }) {
    const [loading, setLoading] = useState(false)
    const deployContractHandler = async () => {
        setLoading(true)
        try {
            const response = await axios.post('http://localhost:3001/deployContract');
            setContractAddress(response.data.address);
            console.log('Contract deployed at:', response.data.address);
        } catch (error) {
            console.error('Failed to deploy contract:', error);
        } finally {
            setLoading(false)

        }
    };

    return (
        <button disabled={loading} className='button-outline' onClick={deployContractHandler}>{loading ? "Deploying..." : "Deploy Contract"}</button>
    );
}

export default DeployContract;
