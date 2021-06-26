// SPDX-License-Identifier: Blockchain

pragma solidity ^0.5.4;

contract Marketplace {
    string public name;

    //hawkerName details
    string public hawkerName = "Selera Rasa Nasi Lemak";
    string public hawkerAddress =
        "2 Adam Rd, #01-02 Food Centre, Singapore 289876";
    string public hawkerOpeningHours =
        "Monday - Thursday: 7am-5pm; Saturday - Sunday 7am-3pm";
    string public hawkerPhone = "98434509";

    //Supplier products
    uint256 public suppProdCount = 0;
    mapping(uint256 => SuppProduct) public suppProducts;

    //Restaurants products
    uint256 public restProdCount = 0;
    mapping(uint256 => RestProduct) public restProducts;

    struct SuppProduct {
        uint256 id;
        string name;
        uint256 price;
        address payable owner; //when listing, the owner will be the seller. when buying, the owner will change from the seller to the buyer
        bool purchased;
    }

    struct RestProduct {
        uint256 id;
        string name;
        uint256 price;
        address payable owner;
        bool purchased;
    }

    struct RestProfile {
        uint256 id;
        string name;
        string category;
        string location;
        string deliveryHours;
        address payable owner;
        string reviews;
        uint256 rating;
    }

    event ProductCreated(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint256 id,
        string name,
        uint256 price,
        address payable owner,
        bool purchased
    );

    constructor() public {
        name = "Dapp University Marketplace";
    }

    function returnString() public view returns (string memory) {
        return hawkerName;
    }

    //parameter _price is expressed in Ethereum cryptocurrency - Ether
    //whenever we store Ether in the blockchain, we store it as Wei (smallest denomination of Ether )
    //can check it on etherconverter.online
    function createSuppProduct(string memory _name, uint256 _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        suppProdCount++;
        // Create the product --- msg.sender is the one who accessed the function
        suppProducts[suppProdCount] = SuppProduct(
            suppProdCount,
            _name,
            _price,
            msg.sender,
            false
        );
        // Trigger an event
        emit ProductCreated(suppProdCount, _name, _price, msg.sender, false);
    }

    function createRestProduct(string memory _name, uint256 _price) public {
        // Require a valid name
        require(bytes(_name).length > 0);
        // Require a valid price
        require(_price > 0);
        // Increment product count
        restProdCount++;
        // Create the product --- msg.sender is the one who accessed the function
        restProducts[restProdCount] = RestProduct(
            restProdCount,
            _name,
            _price,
            msg.sender,
            false
        );
        // Trigger an event
        emit ProductCreated(restProdCount, _name, _price, msg.sender, false);
    }

    // function purchaseProduct(uint256 _id) public payable {
    //     //Fetch the product
    //     Product memory _product = products[_id];
    //     //Fetch the owner
    //     address payable _seller = _product.owner;
    //     //Make sure the product has a valid id
    //     //require(_product.id > 0 && _product.id <= productCount); ---> need to change
    //     //Require that there is enough Ether in the transaction
    //     require(msg.value >= _product.price);
    //     //Require that the product has not been purchased already
    //     require(!_product.purchased);
    //     //Require that the buyer is not the seller
    //     require(_seller != msg.sender);
    //     //Transfer ownership to the buyer
    //     _product.owner = msg.sender;
    //     //Mark as purchased
    //     _product.purchased = true;
    //     //Update the product
    //     products[_id] = _product;
    //     //Pay the seller by sending them Ether
    //     address(_seller).transfer(msg.value);

    //     //Trigger an event
    //     emit ProductPurchased(
    //         productCount,
    //         _product.name,
    //         _product.price,
    //         msg.sender,
    //         true
    //     );
    // }
}
