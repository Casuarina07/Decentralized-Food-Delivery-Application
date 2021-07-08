// SPDX-License-Identifier: Blockchain

pragma solidity ^0.5.4;
pragma experimental ABIEncoderV2;

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
        addCustomer(
            0xC9342f12d49ca9e40d600eBF17266DcCc88a0639,
            "Casuarina",
            "50 Nanyang Ave, Singapore 639798",
            "98765432"
        );
    }

    //HAWKER
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
            5,
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

    //SUPPLIER
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
        string imageHash;
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
        bool purchased,
        string imageHash
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
        emit ProductCreated(
            suppProdCount,
            _name,
            _price,
            msg.sender,
            false,
            _name
        );
    }

    function createRestProduct(
        string memory _name,
        uint256 _price,
        string memory _imageHash
    ) public {
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
            false,
            _imageHash
        );
        // Trigger an event
        emit ProductCreated(
            restProdCount,
            _name,
            _price,
            msg.sender,
            false,
            _imageHash
        );
    }

    struct Order {
        address owner;
        uint256 totalPrice;
        mapping(uint256 => CartItem) purchasedItemId;
        uint256 purchasedItemCount;
        string date;
        string time;
    }

    mapping(address => Order) public orders;

    struct CartItem {
        uint256 id;
        uint256 productId;
    }

    //CUSTOMER
    struct Customer {
        uint256 id;
        address owner;
        string name;
        string addressLocation;
        string phone;
        mapping(uint256 => CartItem) cartItems;
        uint256 itemCount;
    }

    mapping(uint256 => Customer) public customers;
    uint256 public customersCount;

    function addCustomer(
        address _owner,
        string memory _name,
        string memory _addressLocation,
        string memory _phone
    ) public {
        customersCount++;
        //CartItem[] memory cartItems;
        customers[customersCount] = Customer(
            customersCount,
            _owner,
            _name,
            _addressLocation,
            _phone,
            0
        );
    }

    function editCustProfile(string memory _phone, string memory _address)
        public
    {
        uint256 i = 0;
        for (i = 0; i <= customersCount; i++) {
            if (customers[i].owner == msg.sender) {
                customers[i].phone = _phone;
                customers[i].addressLocation = _address;
            }
        }
    }

    function addToCart(uint256 _id) public {
        uint256 i = 0;
        for (i = 0; i <= customersCount; i++) {
            if (customers[i].owner == msg.sender) {
                (customers[i].itemCount)++;
                // customers[i].cartItems[customers[i].itemCount].push(
                //     CartItem(customers[i].itemCount, _id)
                // );
                customers[i].cartItems[customers[i].itemCount] = CartItem(
                    customers[i].itemCount,
                    _id
                );
            }
        }
    }

    function removeProdCart(uint256 custId, uint256 cartId) public {
        Customer storage cust = customers[custId];
        (cust.itemCount)--;
        delete cust.cartItems[cartId];
    }

    function removeAllProdCart(uint256 custId) public {
        Customer storage cust = customers[custId];
        uint256 _itemCount = cust.itemCount;
        for (uint256 i = 1; i <= _itemCount; i++) {
            delete cust.cartItems[i];
        }
        (cust.itemCount) = 0;
    }

    function getCartProduct(uint256 custId, uint256 cartId)
        public
        returns (uint256)
    {
        Customer storage cust = customers[custId];
        return (cust.cartItems[cartId].productId);
    }

    // function purchaseProduct(
    //     uint256 _custId,
    //     address _seller,
    //     uint256 _totalCost,
    //     string _date,
    //     string _time
    // ) public payable {
    //     Customer memory cust = customers[_custId];
    //     //address payable seller = _seller;
    //     //Pay the seller by sending them Ether
    //     address(_seller).transfer(msg.value);

    //     //remove the CartItem in the Customer id
    // }

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
