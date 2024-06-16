// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Altushka {
    string public name = "Altushka NFT";
    string public symbol = "ALT";
    uint256 public constant MINT_PRICE = 0.0420 ether;
    uint256 public constant MAX_SUPPLY = 303;
    uint256 public totalSupply;
    address public owner;

    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => string) private _tokenURIs;

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _owners[tokenId] != address(0);
    }

    function _mint(address to, uint256 tokenId, string memory tokenURI) internal {
        require(to != address(0), "Mint to the zero address");
        require(!_exists(tokenId), "Token already minted");

        _owners[tokenId] = to;
        _balances[to] += 1;
        totalSupply += 1;
        _tokenURIs[tokenId] = tokenURI;

        emit Transfer(address(0), to, tokenId);
    }

    function mint() external payable {
        require(totalSupply < MAX_SUPPLY, "Max supply reached");
        require(msg.value == MINT_PRICE, "Incorrect payment amount");

        uint256 tokenId = totalSupply + 1;
        string memory tokenURI = string(abi.encodePacked("https://purple-odd-dragonfly-67.mypinata.cloud/ipfs/QmTBkb6BoRrfW8tBsWLKwhobNT8sERUPeNhj3QskfeKVLB/", uint2str(tokenId), ".png"));

        _mint(msg.sender, tokenId, tokenURI);
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    function balanceOf(address owner_) external view returns (uint256) {
        require(owner_ != address(0), "Balance query for the zero address");
        return _balances[owner_];
    }

    function ownerOf(uint256 tokenId) external view returns (address) {
        address owner_ = _owners[tokenId];
        require(owner_ != address(0), "Owner query for nonexistent token");
        return owner_;
    }

    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }

    function uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
