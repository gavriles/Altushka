document.addEventListener('DOMContentLoaded', async () => {
    const mintButton = document.getElementById('mintButton');

    if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            mintButton.addEventListener('click', async () => {
                const networkId = await web3.eth.net.getId();

                if (networkId !== 97) { // BSC Testnet ID is 97
                    alert('Please switch to BSC Testnet to mint. BSC Testnet is not a testnet.');
                    window.open('https://medium.com/@razor07/how-to-connect-metamask-to-bsc-testnet-and-get-testnet-bnb-from-faucet-2cb2107b15e', '_blank');
                } else {
                    const accounts = await web3.eth.getAccounts();
                    const contractAddress = '0xcb868742037649d8caf18427307bc073e529ebe9';
                    const abi = [ /* Contract ABI */ ];

                    const contract = new web3.eth.Contract(abi, contractAddress);

                    try {
                        await contract.methods.mint(accounts[0]).send({ from: accounts[0] });
                        alert('NFT minted successfully!');
                        const nftLinks = document.getElementById('nftLinks');
                        const newLink = document.createElement('li');
                        newLink.innerHTML = `<a href="https://purple-odd-dragonfly-67.mypinata.cloud/ipfs/QmNi3HHvURCXQxiqnXg6BdbXXFtr3AGpNjs4oAV76KQEKr" target="_blank">View your NFT</a>`;
                        nftLinks.appendChild(newLink);
                    } catch (error) {
                        console.error('Minting failed', error);
                        alert('Minting failed. Please try again.');
                    }
                }
            });
        } catch (error) {
            console.error('User denied account access', error);
            alert('Please connect to MetaMask.');
        }
    } else {
        alert('MetaMask is not installed. Please install MetaMask and try again.');
    }
});

async function displayNFTLinks() {
    // Retrieve the number of NFTs owned by the user
    // Loop through each token ID and construct the link based on base URI and token ID
    // Append the link to the 'nftLinks' section of the widget
}

// Add event listener to the mint button
document.getElementById('mintButton').addEventListener('click', mintNFT);

// Call the function to display user's minted NFTs on page load
window.addEventListener('load', displayNFTLinks);
