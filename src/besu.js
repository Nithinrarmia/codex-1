const { ethers } = require('ethers');

/**
 * Create a new wallet using ethers.js
 * @returns {ethers.Wallet}
 */
function createWallet() {
  return ethers.Wallet.createRandom();
}

/**
 * Deploy an ERC20 token contract.
 * @param {ethers.Wallet} wallet - Deployer wallet
 * @param {Object} contractJson - Object containing `abi` and `bytecode`
 * @param {Array<any>} [args=[]] - Constructor arguments
 * @returns {Promise<ethers.Contract>}
 */
async function deployToken(wallet, contractJson, args = []) {
  const factory = new ethers.ContractFactory(contractJson.abi, contractJson.bytecode, wallet);
  const contract = await factory.deploy(...args);
  await contract.deployed();
  return contract;
}

/**
 * Mint tokens to a wallet
 * @param {ethers.Contract} tokenContract
 * @param {ethers.Wallet} minterWallet
 * @param {string} to - Address to mint to
 * @param {ethers.BigNumberish} amount
 */
async function mintTokens(tokenContract, minterWallet, to, amount) {
  const contractWithSigner = tokenContract.connect(minterWallet);
  const tx = await contractWithSigner.mint(to, amount);
  return tx.wait();
}

/**
 * Transfer tokens
 * @param {ethers.Contract} tokenContract
 * @param {ethers.Wallet} fromWallet
 * @param {string} to
 * @param {ethers.BigNumberish} amount
 */
async function transferTokens(tokenContract, fromWallet, to, amount) {
  const contractWithSigner = tokenContract.connect(fromWallet);
  const tx = await contractWithSigner.transfer(to, amount);
  return tx.wait();
}

/**
 * Burn tokens
 * @param {ethers.Contract} tokenContract
 * @param {ethers.Wallet} burnerWallet
 * @param {ethers.BigNumberish} amount
 */
async function burnTokens(tokenContract, burnerWallet, amount) {
  const contractWithSigner = tokenContract.connect(burnerWallet);
  const tx = await contractWithSigner.burn(amount);
  return tx.wait();
}

/**
 * Transfer entire balance from one wallet to another.
 * @param {ethers.Contract} tokenContract
 * @param {ethers.Wallet} fromWallet
 * @param {string} to
 */
async function transferAllTokens(tokenContract, fromWallet, to) {
  const balance = await tokenContract.balanceOf(fromWallet.address);
  if (balance.isZero()) return;
  await transferTokens(tokenContract, fromWallet, to, balance);
}

module.exports = {
  createWallet,
  deployToken,
  mintTokens,
  transferTokens,
  burnTokens,
  transferAllTokens,
};
