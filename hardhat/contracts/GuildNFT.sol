//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract GuildNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GuildNFT", "GGD") {}

    struct Guild {
        address guildMasterAddress;
        string guildName;
        string guildNFTURI;
        uint256 maxGuildMembers;
        uint256 numberOfMembers;
        address[] members;
    }

    Guild[] Guilds;

    mapping(uint256 => uint256) public tokenIdsToGuildId;

    function createGuild(string memory guildName, string memory guildNFTURI, uint256 maxGuildMembers)
        public
        returns (Guild[] memory)
    {   
        require(maxGuildMembers < 100000);

        address[] memory members;

        Guild memory guild = Guild(msg.sender, guildName, guildNFTURI, maxGuildMembers, 1, members);
        Guilds.push(guild);

        return Guilds;
    }

    function mintNFT(address recipient, uint256 guildId)
        public
        returns (uint256)
    {

        Guilds[guildId].numberOfMembers += 1;

        if(Guilds[guildId].maxGuildMembers < Guilds[guildId].numberOfMembers){
            revert("Max Guild Members Reached, cannot mint new membership");
        }

        Guilds[guildId].members.push(msg.sender);

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        tokenIdsToGuildId[newItemId] = guildId;
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, Guilds[guildId].guildNFTURI);

        return newItemId;
    }

    function returnGuilds()
        public view
        returns (Guild[] memory)
    {
        return Guilds;
    }

    function returnGuildMembers(uint guildId)
        public view
        returns (address[] memory)
    {
        return Guilds[guildId].members;
    }

}