// contracts/gana.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Gana is ERC721Pausable, Ownable {

    using Counters for Counters.Counter;

    // TransferHistory structure
    struct TransferHistory {
        uint256 timeStamp;
        address to; 
    }
    
    // Mapping from token ID to transfer history
    mapping(uint256 => mapping(uint32 => TransferHistory)) private _transferHistory;

    // Mapping from token ID to transfer count
    mapping(uint256 => uint32) private _transferCounts;

    Counters.Counter private _tokenIds;

    constructor () ERC721("Gana", "gana") {

    }

    function addToTransferHistory (
        address to,
        uint256 tokenId
    ) internal {
        uint32 transferCount = _transferCounts[tokenId];
        _transferHistory[tokenId][transferCount] = TransferHistory({
            timeStamp: block.timestamp,
            to: to
        });
        _transferCounts[tokenId] = transferCount + 1;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory _data
    ) public override whenNotPaused {
        super.safeTransferFrom(from, to, tokenId, _data);
        addToTransferHistory(to, tokenId);
    }

    function retrieveTransferCounts(
        uint256 tokenId
    ) public view onlyOwner returns (
        uint32 transferCount
    ) {
        transferCount = _transferCounts[tokenId];
    }

    function retrieveTransferHistory(
        uint256 tokenId
    ) public view onlyOwner whenNotPaused returns (
        uint256[] memory timeStamp,
        address[] memory to
    ) {
        require(_exists(tokenId), "Gana: Transfer history query for nonexistent tokenId");

        uint32 transferCount = _transferCounts[tokenId];
        timeStamp = new uint256[](transferCount);
        to = new address[](transferCount);

        for(uint32 i=0; i<transferCount; ++i) {
            timeStamp[i] = _transferHistory[tokenId][i].timeStamp;
            to[i] = _transferHistory[tokenId][i].to;
        } 
    }

    function mint(
        address to
    ) public onlyOwner whenNotPaused returns (
        uint256 tokenId
    ){
        _tokenIds.increment();
        tokenId = _tokenIds.current();
        super._mint(to, tokenId);
        addToTransferHistory(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "http://localhost:4000/api/v1/t/gana/meta/";
    }

    function pause() public onlyOwner {
        super._pause();
    }

    function unpause() public onlyOwner {
        super._unpause();
    }
}