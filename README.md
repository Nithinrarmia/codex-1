# Hyperledger Besu Node.js Utilities

This project contains helper functions for interacting with a Hyperledger Besu network using Node.js and ethers.js. The core API is located in `src/besu.js` and provides the following operations:

1. **Wallet creation** - create a new wallet with a random private key.
2. **Token deployment** - deploy an ERC20 smart contract.
3. **Token minting** - mint tokens to a target address.
4. **Token transfer** - transfer tokens between addresses.
5. **Token burning** - burn tokens from an address.
6. **Merge wallets** - transfer all tokens from one wallet to another.

Install dependencies (requires network access):

```bash
npm install ethers dotenv
```

Example usage:

```javascript
const {
  createWallet,
  deployToken,
  mintTokens,
  transferTokens,
  burnTokens,
  transferAllTokens,
} = require('./src/besu');

// create a new wallet
const wallet = createWallet();
console.log('Address:', wallet.address);
```
