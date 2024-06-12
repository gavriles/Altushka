const contractAddress = "0xcb868742037649d8caf18427307bc073e529ebe9";
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_baseTokenURI",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextTokenId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "ownerOf",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "baseTokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "tokenURI",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let web3;
let contract;
let accounts;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            contract = new web3.eth.Contract(contractABI, contractAddress);
            document.getElementById('connectButton').innerText = 'Wallet Connected';
            document.getElementById('mintSection').style.display = 'block';
            document.getElementById('transferSection').style.display = 'block';
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
});

document.getElementById('mintButton').addEventListener('click', async () => {
    try {
        await contract.methods.mint().send({ from: accounts[0] });
        document.getElementById('feedback').innerText = 'NFT minted successfully!';
    } catch (error) {
        console.error(error);
        document.getElementById('feedback').innerText = 'Error minting NFT';
    }
});

document.getElementById('transferButton').addEventListener('click', async () => {
    const recipient = document.getElementById('recipient').value;
    const tokenId = document.getElementById('tokenId').value;
    try {
        await contract.methods.transfer(recipient, tokenId).send({ from: accounts[0] });
        document.getElementById('feedback').innerText = 'NFT transferred successfully!';
    } catch (error) {
        console.error(error);
        document.getElementById('feedback').innerText = 'Error transferring NFT';
    }
});
