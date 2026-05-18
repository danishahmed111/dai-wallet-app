import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Container, Button, Typography, TextField, Box } from '@mui/material';
const TOKENS = [
  { symbol: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', decimals: 18 },
  { symbol: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', decimals: 6 },
  { symbol: 'USDT', address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', decimals: 6 }
];
const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)"
];
function App() {
  const [account, setAccount] = useState(null);
  const [balances, setBalances] = useState({});
  const [token, setToken] = useState('DAI');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const connectWallet = async () => {
    if(window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      getTokenBalances(accounts[0]);
    }
  };
  const getTokenBalances = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    let newBalances = {};
    for (let tk of TOKENS) {
      const contract = new ethers.Contract(tk.address, ERC20_ABI, provider);
      const bal = await contract.balanceOf(address);
      newBalances[tk.symbol] = ethers.utils.formatUnits(bal, tk.decimals);
    }
    setBalances(newBalances);
  };
  const sendToken = async () => {
    setTxStatus('Sending...');
    try {
      const tk = TOKENS.find(t => t.symbol === token);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tk.address, ERC20_ABI, signer);
      const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, tk.decimals));
      await tx.wait();
      setTxStatus('Sent!');
      getTokenBalances(account);
    } catch (err) {
      setTxStatus('Error: ' + err.message);
    }
  };
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Multi-Token Wallet App</Typography>
      {account ? (
        <>
          <Typography>Connected wallet: {account}</Typography>
          <Box sx={{ mb: 2 }}>
            {TOKENS.map(tk => (
              <Typography key={tk.symbol}>
                {tk.symbol} Balance: {balances[tk.symbol] || 'Loading...'}
              </Typography>
            ))}
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {TOKENS.map(tk => (
              <Button key={tk.symbol} variant={token === tk.symbol ? "contained" : "outlined"} onClick={() => setToken(tk.symbol)}>
                {tk.symbol}
              </Button>
            ))}
          </Box>
          <TextField
            label="Recipient address"
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label={`Amount (${token})`}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={sendToken}>Send {token}</Button>
          <Typography sx={{ mt: 2 }}>{txStatus}</Typography>
        </>
      ) : (
        <Button variant="contained" onClick={connectWallet}>Connect Wallet</Button>
      )}
    </Container>
  );
}
export default App;

src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
