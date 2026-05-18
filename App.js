import React, { useState } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h2>DAI Wallet App</h2>
      {account
        ? <p>Connected wallet: {account}</p>
        : <button onClick={connectWallet}>Connect Wallet</button>
      }
    </div>
  );
}

export default App;
