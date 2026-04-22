// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract AyurChain {

    // Every stage in the supply chain is a "Batch"
    struct Batch {
        uint256 id;
        string herbName;
        string location;        // geo-tag: "lat,long"
        string stage;           // "harvested", "collected", "processed", "manufactured"
        address addedBy;        // wallet address of whoever added this
        uint256 timestamp;
        string notes;
    }

    // Store all batches
    mapping(uint256 => Batch) public batches;
    uint256 public batchCount;

    // Events — emitted every time a new batch is added
    event BatchAdded(
        uint256 indexed id,
        string herbName,
        string stage,
        address addedBy,
        uint256 timestamp
    );

    // Add a new batch to the chain
    function addBatch(
        string memory _herbName,
        string memory _location,
        string memory _stage,
        string memory _notes
    ) public {
        batchCount++;
        batches[batchCount] = Batch({
            id: batchCount,
            herbName: _herbName,
            location: _location,
            stage: _stage,
            addedBy: msg.sender,
            timestamp: block.timestamp,
            notes: _notes
        });

        emit BatchAdded(batchCount, _herbName, _stage, msg.sender, block.timestamp);
    }

    // Get a batch by ID
    function getBatch(uint256 _id) public view returns (Batch memory) {
        require(_id > 0 && _id <= batchCount, "Batch does not exist");
        return batches[_id];
    }

    // Get total number of batches
    function getTotalBatches() public view returns (uint256) {
        return batchCount;
    }
}