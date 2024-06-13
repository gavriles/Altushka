// script.js

// Define the contract address and ABI
const contractAddress = 0xdf72ab181c97fa0979f1f22c3894f6d1356de0b8;
const contractABI = /* Insert your contract ABI here */;

// Web3 provider
let web3;

// Function to connect the wallet
async function connectWallet() {
    try {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable();
            console.log('Wallet connected:', web3.eth.accounts[0]);
        } else {
            console.error('No Ethereum provider detected');
        }
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Function to mint a token
async function mintToken() {
    try {
        const accounts = await web3.eth.getAccounts();
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        await contract.methods.mint().send({ from: accounts[0] });
        console.log('Token minted successfully');
    } catch (error) {
        console.error('Error minting token:', error);
    }
}

// Event listeners
document.getElementById('connectWallet').addEventListener('click', connectWallet);
document.getElementById('mintToken').addEventListener('click', mintToken);
