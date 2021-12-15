// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";


contract Test {
  address private owner;

  constructor() {
    console.log('Address of owner:', msg.sender);
    owner = msg.sender;
  }

  function getOwner() public view returns(address) {
    return owner;
  }

  function setOwner(address _newOwner) public {
    require(msg.sender == owner);
    console.log("Changing owner from '%s' to new Owner '%s'", owner, _newOwner);
    owner = _newOwner;
  }

}