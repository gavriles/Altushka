// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Altushka NFT {
    // State variables
    address public owner;
    uint256 public nextTokenId;
    string public baseTokenURI;

    // Mapping from token ID to owner address
    mapping(uint256 => address) private _owners;

    // Events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // Constructor
    constructor(string memory _baseTokenURI) {
        owner = msg.sender;
        baseTokenURI = _baseTokenURI;
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Mint function to mint new NFTs
    function mint() public onlyOwner {
        uint256 tokenId = nextTokenId++;
        _owners[tokenId] = owner;
        emit Transfer(address(0), owner, tokenId);
    }

    // Transfer function to transfer ownership of NFT
    function transfer(address to, uint256 tokenId) public {
        require(to != address(0), "Invalid address");
        require(ownerOf(tokenId) == msg.sender, "Not the owner of the token");
        
        _owners[tokenId] = to;
        emit Transfer(msg.sender, to, tokenId);
    }

    // Returns the owner of the token
    function ownerOf(uint256 tokenId) public view returns (address) {
        return _owners[tokenId];
    }

    // Set the base URI for token metadata
    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    // Returns the token URI
    function tokenURI(uint256 tokenId) public view returns (string memory) {
        require(_owners[tokenId] != address(0), "Token does not exist");
        return string(abi.encodePacked(baseTokenURI, uint2str(tokenId)));
    }

    // Convert uint to string
    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        j = _i;
        while (j != 0) {
            bstr[--k] = bytes1(uint8(48 + j % 10));
            j /= 10;
        }
        return string(bstr);
    }
}
