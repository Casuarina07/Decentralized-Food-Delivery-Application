// SPDX-License-Identifier: Blockchain
pragma solidity ^0.5.16;
pragma experimental ABIEncoderV2;

contract Reports {
    string public name;

    constructor() public {
        name = "Reports Solidity Contract";
    }

    struct Report {
        uint256 id;
        address reporter;
        uint256 reportDate;
        uint256 orderId;
        string title;
        string[] imageHash;
        string[] missingItems;
        string remarks;
        uint256 approvalCount;
        uint256 rejectionCount;
        address[] voters;
        bool complete;
        uint256 penaltyFee;
    }

    mapping(uint256 => Report) public reports;
    uint256 public reportsCount;

    function createReport(
        uint256 _orderId,
        string memory _title,
        string[] memory _imageHash,
        string[] memory _missingItems,
        string memory _remarks
    ) public {
        reportsCount++;
        reports[reportsCount] = Report(
            reportsCount,
            msg.sender,
            now,
            _orderId,
            _title,
            _imageHash,
            _missingItems,
            _remarks,
            0,
            0,
            new address[](0),
            false,
            0
        );
    }

    function getImageHash(uint256 _reportId)
        public
        returns (string[] memory imageHash)
    {
        return reports[_reportId].imageHash;
    }

    function getMissingItems(uint256 _reportId)
        public
        returns (string[] memory missingItems)
    {
        return reports[_reportId].missingItems;
    }

    function getVoters(uint256 _reportId)
        public
        returns (address[] memory voters)
    {
        return reports[_reportId].voters;
    }

    function addApprovalCount(uint256 _reportId) public {
        reports[_reportId].approvalCount = reports[_reportId].approvalCount + 1;
        (reports[_reportId].voters).push(msg.sender);
    }

    function addRejectionCount(uint256 _reportId) public {
        reports[_reportId].rejectionCount =
            reports[_reportId].rejectionCount +
            1;
        (reports[_reportId].voters).push(msg.sender);
    }
}
