// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract myNFT is ERC721, Ownable {
    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol)
    {

    }

    uint256 COUNTER;



    struct NFT {
        string name;
        uint256 id;
        uint256 dna;
    }

    NFT[] public nfts;

    event NewNFT(address indexed owner, uint256 id, uint256 dna);

    // Helpers
    function _createRandomNum(uint256 _mod) internal view returns (uint256) {
        uint256 randomNum = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        return randomNum % _mod;
    }



    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }

    // Creation
    function _createNFT(string memory _name) internal {
        uint256 randDna = _createRandomNum(10**16);
        NFT memory newnft = NFT(_name, COUNTER, randDna);
        nfts.push(newnft);
        _safeMint(msg.sender, COUNTER);
        emit NewNFT(msg.sender, COUNTER, randDna);
        COUNTER++;
    }

    function createRandomNFT(string memory _name) public payable {
        _createNFT(_name);
    }

    // Getters
    function getNFTs() public view returns (NFT[] memory) {
        return nfts;
    }

    function getOwnerNFTs(address _owner) public view returns (NFT[] memory) {
        NFT[] memory result = new NFT[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < nfts.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = nfts[i];
                counter++;
            }
        }
        return result;
    }


}
