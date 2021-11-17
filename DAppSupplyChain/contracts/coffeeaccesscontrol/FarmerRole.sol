pragma solidity ^0.5.16;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole {

  // Using the library with basic functions for the different roles in the supply chain
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event FarmerRoleAdded(address indexed account);
  event FarmerRoleRemoved(address indexed account);

  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private _farmerRole;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    _addFarmer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyFarmer() {
    require(isFarmer(msg.sender),'Not registered as Farmer');
    _;
  }

  // Define a function 'isFarmer' to check this role
  function isFarmer(address account) public view returns (bool) {
    return _farmerRole.has(account);
  }

  // Define a function 'addFarmer' that adds this role
  function addFarmer(address account) public onlyFarmer {
    _addFarmer(account);
  }

  // Define a function 'renounceFarmer' to renounce this role
  function renounceFarmer() public {
    _removeFarmer(msg.sender);
    emit FarmerRoleRemoved(msg.sender);
  }

  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addFarmer(address account) internal {
    _farmerRole.add(account);
    emit FarmerRoleAdded(account);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeFarmer(address account) internal {
    _farmerRole.remove(account);
    emit FarmerRoleAdded(account);
  }
}