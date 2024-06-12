# Altushka it is fun NFT mem contract in testnet Binance Smart Chaine 
Contract adress: 0xcb868742037649d8caf18427307bc073e529ebe9
Link on testnet: https://testnet.bscscan.com/address/0xcb868742037649d8caf18427307bc073e529ebe9

Interfaces:

ERC721: This interface defines the standard ERC-721 functions and events for token management.
ERC721Metadata: Extends ERC721 and adds functions for token metadata such as name, symbol, and tokenURI.
Library:

Address: This library provides utility functions for address types, including checking if an address is a contract.
Contract:

Altushka: This is the main contract that implements ERC-721 and ERC-721Metadata interfaces. It represents a collection of unique tokens called "Altushkas."
State variables:
_name, _symbol: Strings representing the name and symbol of the token.
_tokenCounter: Counter to track the total number of tokens minted.
_owner: Address of the contract owner.
Various mappings to track token ownership, approvals, and token URIs.
Constructor: Sets initial values for _name, _symbol, _owner, and _tokenCounter.
Core Functions:
createAltushka: Allows the contract owner to mint new Altushka tokens with a given tokenURI. It increments the token counter and sets the token URI.
_safeMint, _mint: Internal functions to mint new tokens and update balances.
_transfer: Internal function to transfer ownership of a token from one address to another.
_approve: Internal function to approve or set operators for a token.
_setTokenURI: Internal function to set the metadata URI for a token.
View Functions:
name, symbol: Return the name and symbol of the token.
tokenURI: Returns the metadata URI for a given token.
balanceOf, ownerOf, getApproved, isApprovedForAll: Functions to query token ownership and approval status.
Transfer Functions:
safeTransferFrom, transferFrom: Transfer tokens from one address to another.
safeTransferFrom (with data): Same as above, with additional data parameter.
approve, setApprovalForAll: Approve transfers or set operator approvals.
Internal Helper Functions:
_exists, _isApprovedOrOwner, _checkOnERC721Received: Helper functions for internal use.
Integration with IPFS:

The contract interacts with the IPFS (InterPlanetary File System) to store token metadata. Token metadata includes information such as images, descriptions, and attributes. The IPFS URL provided contains images associated with the tokens.


[ This is a BNB Smart Chain Testnet Testnet transaction only ]
Transaction Hash:
0x18f7170287a5d3c6fa54627bd5e49ac5f0cfa35a36ac013e85c02fd5d3f4451c 
Status:
Success
Block:
41033387
132 Block Confirmations
Timestamp:
6 mins ago (Jun-08-2024 03:42:52 AM +UTC)
Transaction Action:
Call
0x6055604b
Method by
0x2859ad15...e3ea80774
From:
0x2859ad15A901C5Ea5FAF0E8bA361f99e3ea80774
To:
[  0xebe09b3d6abc26b7e6e716cc0d7ad5bf2383b206 Created ] 
Value:
BNB Smart Chain Logo
0 BNB
($0.00)
Transaction Fee:
Gas Price:
4.8985 Gwei (0.0000000048985 BNB)
0x18f7170287a5d3c6fa54627bd5e49ac5f0cfa35a36ac013e85c02fd5d3f4451c
