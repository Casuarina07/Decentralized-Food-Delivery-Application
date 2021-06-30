// SPDX-License-Identifier: Blockchain

pragma solidity ^0.5.4;

contract Marketplace {
    //constructor
    constructor() public {
        addHawker(
            0x73c005D4B234C63F416F6e1038C011D55edDBF1e,
            "Selera Rasa Nasi Lemak",
            "2 Adam Rd, #01-02 Food Centre, Singapore 289876",
            "Monday - Thursday: 7am-5pm; Saturday - Sunday 7am-3pm",
            "98434509",
            false
        );
        addHawker(
            0x87ECEE1454A7b32253A9020F6ae1FF25e9CE35B5,
            "Tian Tian Hainanese Chicken Rice",
            "Maxwell Food Centre #01-10/11, 1 Kadayanallur Street, Singapore 069184",
            "Tuesday – Sunday: 10am – 7:30pm",
            "96914852",
            false
        );
    }

    struct Hawker {
        uint256 id;
        address owner;
        string name;
        string addressLocation;
        string openingHours;
        string phone;
        int256 rating;
        bool open;
    }
    // Read/write Hawkers
    mapping(uint256 => Hawker) public hawkers;
    //Store Hawkers Count
    uint256 public hawkersCount;

    function addHawker(
        address _owner,
        string memory _name,
        string memory _addressLocation,
        string memory _openingHours,
        string memory _phone,
        bool _open
    ) public {
        hawkersCount++;
        hawkers[hawkersCount] = Hawker(
            hawkersCount,
            _owner,
            _name,
            _addressLocation,
            _openingHours,
            _phone,
            0,
            _open
        );
    }

    function editHawkerProfile(string memory _phone, string memory _OH) public {
        uint256 i = 0;
        for (i = 0; i <= hawkersCount; i++) {
            if (hawkers[i].owner == msg.sender) {
                hawkers[i].phone = _phone;
                hawkers[i].openingHours = _OH;
            }
        }
    }

    function boolOpen() public {
        uint256 i = 0;
        for (i = 0; i <= hawkersCount; i++) {
            if (hawkers[i].owner == msg.sender) {
                hawkers[i].open = !(hawkers[i].open);
            }
        }
    }

    //Supplier products
    uint256 public suppProdCount = 0;
    mapping(uint256 => SuppProduct) public suppProducts;
    struct SuppProduct {
        uint256 id;
        string name;
        uint256 price;
        address payable owner; //when listing, the owner will be the seller. when buying, the owner will change from the seller to the buyer
        bool purchased;
    }

    //Restaurants products
    uint256 public restProdCount = 0;
    mapping(uint256 => RestProduct) public restProducts;
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
