pragma solidity ^0.5.16;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole {

  // Using the library with basic functions for the different roles in the supply chain
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event RetailerRoleAdded(address indexed account);
  event RetailerRoleRemoved(address indexed account);
  
  // Define a struct 'retailers' by inheriting from 'Roles' library, struct Role
  Roles.Role private _retailerRole;

  // In the constructor make the address that deploys this contract the 1st retailer
  constructor() public {
    _addRetailer(msg.sender);    
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyRetailer() {
    require(isRetailer(msg.sender),'Not registered as Retailer');
    _;
  }

  // Define a function 'isRetailer' to check this role
  function isRetailer(address account) public view returns (bool) {
    return _retailerRole.has(account);
  }

  // Define a function 'addRetailer' that adds this role
  function addRetailer(address account) public onlyRetailer {
    _addRetailer(account);
  }

  // Define a function 'renounceRetailer' to renounce this role
  function renounceRetailer() public {
    _removeRetailer(msg.sender);
    emit RetailerRoleRemoved(msg.sender);
  }

  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  function _addRetailer(address account) internal {
    _retailerRole.add(account);    
    emit RetailerRoleAdded(account);
  }

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  function _removeRetailer(address account) internal {
    _retailerRole.remove(account);   
    emit RetailerRoleRemoved(account); 
  }
}