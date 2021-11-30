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
        address owner;
        address hawker;
        uint256 claimAmt;
        uint256 reportDate;
        uint256 deadlineDate;
        uint256 orderId;
        string title;
        string[] imageHash;
        string[] missingItems;
        string remarks;
        uint256 approvalCount;
        uint256 rejectionCount;
        address[] voters;
        bool resolved;
    }

    mapping(uint256 => Report) public reports;
    uint256 public reportsCount;

    function createReport(
        address _hawkerAddress,
        uint256 _claimAmt,
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
            _hawkerAddress,
            _claimAmt,
            now,
            // now + 60, //60 seconds
            now + 2 * 1 days, //2 days
            _orderId,
            _title,
            _imageHash,
            _missingItems,
            _remarks,
            0,
            0,
            new address[](0),
            false
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

    // function claimReturns(address payable _hawker, uint256 _claimAmt)
    //     public
    //     payable
    // {
    //     _hawker.transfer(_claimAmt);
    // }

    function resolveReport(
        uint256 reportId,
        address payable _reporter,
        uint256 _claimAmt
    ) public payable {
        address(_reporter).transfer(_claimAmt);
        reports[reportId].resolved = true;
    }
}
