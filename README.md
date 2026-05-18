# DAI Wallet App

A lightweight client-side wallet for managing DAI stablecoins. This repository contains a JavaScript + HTML implementation intended for local development and demonstration purposes.

## Features

- View DAI balance
- Send DAI to another address
- Transaction history (local/session-based or via connected provider)
- Connect to Ethereum-compatible wallets (e.g., MetaMask)
- Lightweight, easy to extend

> Note: This project is intended as a demo/starting point and must not be used to manage significant funds without proper security audits and backend support.

## Tech stack

- JavaScript (ES6+)
- HTML
- (Optional) Web3 provider such as MetaMask or WalletConnect

## Getting started

Prerequisites

- Node.js >= 14 (for optional local tooling)
- A browser with a Web3 wallet extension (MetaMask) for interacting with Ethereum networks

Install

1. Clone the repo

   git clone https://github.com/danishahmed111/dai-wallet-app.git
   cd dai-wallet-app

2. Install dependencies (if a package.json exists)

   npm install

Run (static preview)

- Open index.html in your browser (for a simple static preview).
- Or run a local static server (recommended):

  npx http-server .

Usage

1. Open the app in a browser with MetaMask (or another injected provider).
2. Select network (Mainnet / Testnet) in your wallet.
3. Connect the wallet from the app UI.
4. View balances and send DAI using the provided form.

Configuration

- Update RPC endpoints or contract addresses in `src/config.js` (if present).
- Add environment-specific settings as needed.

Security and disclaimers

- Do not expose private keys in the codebase.
- Keep dependencies up to date.
- This is a demo app—use with caution and do not store large amounts of funds.

Contributing

Contributions are welcome. Please open an issue to propose features or bug fixes, then submit a pull request with a clear description and tests where appropriate.

License

Specify a license in LICENSE (e.g., MIT). If no license file is present, include one to make reuse terms explicit.

Contact

Repository: https://github.com/danishahmed111/dai-wallet-app
Author: danishahmed111
