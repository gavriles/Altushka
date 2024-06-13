const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; // Replace with your deployed contract address
const contractABI = [
    // Paste your contract ABI here
    // Example:
    // { "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" },
    // { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" },
    // { "constant": false, "inputs": [], "name": "mint", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" },
    // { "constant": true, "inputs": [{ "name": "", "type": "uint256" }], "name": "_tokenURIs", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" },
    // { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" },
    // { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" },
    // { "constant": true, "inputs": [{ "name": "", "type": "address" }], "name": "_balances", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" },
    // { "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" },
    // { "constant": true, "inputs": [], "name": "MAX_SUPPLY", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }
];

let web3;
let contract;
let accounts;

async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('connectButton').innerText = 'Wallet Connected';
            document.getElementById('mintSection').style.display = 'block';
            document.getElementById('adminSection').style.display = 'block';
        } catch (error) {
            console.error('User denied account access', error);
        }
    } else {
        console.error('No Ethereum provider detected');
    }
}

async function mintToken() {
    try {
        await contract.methods.mint().send({
            from: accounts[0],
            value: web3.utils.toWei('0.0420', 'ether'),
            gas: '300000',
        });
        document.getElementById('feedback').innerText = 'NFT minted successfully!';
    } catch (error) {
        console.error('Error minting NFT', error);
        document.getElementById('feedback').innerText = 'Error minting NFT';
    }
}

async function withdrawFunds() {
    try {
        await contract.methods.withdraw().send({
            from: accounts[0],
            gas: '300000',
        });
        document.getElementById('feedback').innerText = 'Funds withdrawn successfully!';
    } catch (error) {
        console.error('Error withdrawing funds', error);
        document.getElementById('feedback').innerText = 'Error withdrawing funds';
    }
}

async function loadContractDetails() {
    try {
        const name = await contract.methods.name().call();
        const symbol = await contract.methods.symbol().call();
        const maxSupply = await contract.methods.MAX_SUPPLY().call();
        const totalSupply = await contract.methods.totalSupply().call();
        
        console.log('Contract Name:', name);
        console.log('Contract Symbol:', symbol);
        console.log('Max Supply:', maxSupply);
        console.log('Current Supply:', totalSupply);
    } catch (error) {
        console.error('Error loading contract details', error);
    }
}

document.getElementById('connectButton').addEventListener('click', connectWallet);
document.getElementById('mintButton').addEventListener('click', mintToken);
document.getElementById('withdrawButton').addEventListener('click', withdrawFunds);

// Additional functions can be added for more contract interactions

// Call the function to load initial contract details
loadContractDetails();

