// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "./PricingPlan.sol";

contract ReadableAddressesNameSystem {

    struct NameSystemRecord {
        string name;
        string cid;
        address registrant;
        address owner;
        uint256 expiration;
    }

    mapping(string => NameSystemRecord) public records;
    address payable owner;
    ReadableAddressesPricingPlan pricingPlan;

    event set(address registrant, uint payment, string name, string cid);

    constructor(address _pricingPlan) {
        owner = payable(msg.sender);
        pricingPlan = ReadableAddressesPricingPlan(_pricingPlan);
    }

    event amount(uint, bool, bool);

    function setRecord(string calldata name, string calldata cid) payable public {
        emit set(msg.sender, msg.value, name, cid);

        uint size = bytes(name).length;
        assert(size >= 3);
        uint256 expiration = records[name].expiration;
        assert(expiration == 0 || expiration <= block.timestamp);
        uint price = pricingPlan.getPriceForName(name);
        assert(msg.value >= price); 

        records[name] = NameSystemRecord({
            name: name,
            cid: cid,
            registrant: msg.sender,
            owner: msg.sender,
            expiration: block.timestamp + 365 days
        });
        owner.transfer(price);
    }

    function getRecord(string calldata name) private view returns (NameSystemRecord storage) {
        NameSystemRecord storage record = records[name];
        assert(record.expiration > block.timestamp);
        return record;
    }

    function getCID(string calldata name) external view returns (string memory) {
        return getRecord(name).cid;
    }

    function getRegistrant(string calldata name) external view returns (address) {
        return getRecord(name).registrant;
    }

    function getOwner(string calldata name) external view returns (address) {
        return getRecord(name).owner;
    }

    function transferRecordOwnership(string calldata name, address newOwner) external {
        NameSystemRecord storage record = getRecord(name);
        assert(msg.sender == record.owner);

        record.owner = newOwner;
    }

    function extendRecordOwnership(string calldata name) payable external {
        NameSystemRecord storage record = getRecord(name);
        assert(msg.sender == record.owner);
        uint price = pricingPlan.getPriceForName(name);
        assert(msg.value >= price);
        
        record.expiration += 365 days;
        owner.transfer(price);
    }
}