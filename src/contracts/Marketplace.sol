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
        addCustomer(
            0x7C2eA58a210F8e7c80fdeB6788C1D5Fc4a3E73ba,
            "Patrick",
            "50 Ang Mo Kio Ave 2, Singapore 639798",
            "91234567"
        );
        addFoodDelivery(
            0x66f8f66996aaB36b041b1cAdA9f20864a0C42698,
            "Leo Tan",
            "90123456",
            false
        );
    }

    //FOOD DELIVERY
    struct FoodDelivery {
        uint256 id;
        address owner;
        string name;
        string phone;
        int256 rating;
        bool available;
        mapping(uint256 => Order) ordersAccepted;
        uint256 ordersAcceptedCount;
        mapping(uint256 => Feedback) feedbacks;
        uint256 feedbackCount;
    }

    // Read/write Food Delivery
    mapping(uint256 => FoodDelivery) public foodDeliveries;
    //Store Food Delivery Count
    uint256 public foodDeliveriesCount;

    //add new food delivery
    function addFoodDelivery(
        address _owner,
        string memory _name,
        string memory _phone,
        bool _available
    ) public {
        foodDeliveriesCount++;
        foodDeliveries[foodDeliveriesCount] = FoodDelivery(
            foodDeliveriesCount,
            _owner,
            _name,
            _phone,
            5,
            _available,
            0,
            0
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
        int256 avgRating;
        bool open;
        mapping(uint256 => Feedback) feedbacks;
        uint256 feedbackCount;
    }

    // Read/write Hawkers
    mapping(uint256 => Hawker) public hawkers;
    //Store Hawkers Count
    uint256 public hawkersCount;

    //FEEDBACK
    struct Feedback {
        uint256 id;
        address seller;
        address customer;
        uint256 rate;
        string comment;
    }

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
            _open,
            0
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

    //change shop status
    function boolOpen() public {
        uint256 i = 0;
        for (i = 0; i <= hawkersCount; i++) {
            if (hawkers[i].owner == msg.sender) {
                hawkers[i].open = !(hawkers[i].open);
            }
        }
    }

    //change food delivery status
    function boolWork() public {
        uint256 i = 0;
        for (i = 0; i <= foodDeliveriesCount; i++) {
            if (foodDeliveries[i].owner == msg.sender) {
                foodDeliveries[i].available = !(foodDeliveries[i].available);
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
        bool published;
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
        bool _published,
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
            _published,
            _imageHash
        );
        // Trigger an event
        emit ProductCreated(
            restProdCount,
            _name,
            _price,
            msg.sender,
            _published,
            _imageHash
        );
    }

    //ORDERS
    enum Status {
        OrderPlaced,
        OrderConfirm,
        DriverConfirm,
        OrderCompleted
    }
    Status public state;

    struct Order {
        uint256 id;
        address owner;
        address seller;
        address driver;
        uint256 totalPrice;
        mapping(uint256 => CartItem) purchasedItemId;
        uint256 purchasedItemCount;
        string date;
        string time;
        Status state;
        bool rated;
    }

    mapping(uint256 => Order) public orders;
    uint256 public ordersCount;

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

    function getOrderProduct(uint256 orderId, uint256 cartId)
        public
        returns (RestProduct memory)
    {
        Order storage ord = orders[orderId];
        uint256 prodId = ord.purchasedItemId[cartId].productId;
        RestProduct memory _product = restProducts[prodId];
        return (_product);
    }

    function getHawkerFeedback(uint256 hawkerId, uint256 feedbackCount)
        public
        returns (Feedback memory)
    {
        Hawker storage hawker = hawkers[hawkerId];
        Feedback memory _feedback = hawker.feedbacks[feedbackCount];
        return (_feedback);
    }

    function getFdFeedback(uint256 fdId, uint256 feedbackCount)
        public
        returns (Feedback memory)
    {
        FoodDelivery storage fd = foodDeliveries[fdId];
        Feedback memory _feedback = fd.feedbacks[feedbackCount];
        return (_feedback);
    }

    function setRating(
        uint256 _orderId,
        address _hawker,
        uint256 _hawkerRate,
        string memory _hawkerComment,
        address _foodDelivery,
        uint256 _fdRate,
        string memory _fdComment
    ) public {
        //set order rated boolean to true
        uint256 j = 0;
        for (j = 0; j <= ordersCount; j++) {
            if (orders[j].id == _orderId) {
                orders[j].rated = true;
            }
        }

        //set hawker feedback
        uint256 i = 0;
        for (i = 0; i <= hawkersCount; i++) {
            if (hawkers[i].owner == _hawker) {
                (hawkers[i].feedbackCount)++;
                hawkers[i].feedbacks[hawkers[i].feedbackCount] = Feedback(
                    hawkers[i].feedbackCount,
                    _hawker,
                    msg.sender,
                    _hawkerRate,
                    _hawkerComment
                );
            }
        }

        //set fd feedback
        uint256 k = 0;
        for (k = 0; k <= foodDeliveriesCount; k++) {
            if (foodDeliveries[k].owner == _foodDelivery) {
                (foodDeliveries[k].feedbackCount)++;
                foodDeliveries[k].feedbacks[
                    foodDeliveries[k].feedbackCount
                ] = Feedback(
                    foodDeliveries[k].feedbackCount,
                    _foodDelivery,
                    msg.sender,
                    _fdRate,
                    _fdComment
                );
            }
        }
    }

    function purchaseProduct(
        uint256 _custId,
        address payable _seller,
        uint256 _totalCost,
        string memory _date,
        string memory _time
    ) public payable {
        Customer memory cust = customers[_custId];
        // Increment order count
        ordersCount++;
        // Create the enum
        state = Status.OrderPlaced;

        // Create the order
        orders[ordersCount] = Order(
            ordersCount,
            cust.owner,
            _seller,
            address(0),
            _totalCost,
            cust.itemCount,
            _date,
            _time,
            state,
            false
        );

        //add the items in cartItems(Customer structure) to purchasedItemId (Order structure)
        for (uint256 i = 1; i <= cust.itemCount; i++) {
            uint256 item = getCartProduct(_custId, i);
            orders[ordersCount].purchasedItemId[i] = CartItem(i, item);
        }

        //Pay the seller by sending them Ether
        address(_seller).transfer(msg.value);

        //remove the CartItem in the Customer id
        removeAllProdCart(_custId);
    }

    //hawker confirms order transaction made by customer
    function hawkerConfirmOrder(uint256 _orderId) public {
        uint256 i = 0;
        for (i = 0; i <= ordersCount; i++) {
            if (orders[i].id == _orderId) {
                orders[i].state = Status.OrderConfirm;
            }
        }
    }

    //food delivery accepts order delivery
    function fdAcceptOrder(uint256 _orderId) public {
        //set orderId state to DriverConfirm
        uint256 i = 0;
        for (i = 0; i <= ordersCount; i++) {
            if (orders[i].id == _orderId) {
                orders[i].state = Status.DriverConfirm;
                orders[i].driver = msg.sender;
            }
        }

        Order memory _order = orders[_orderId];
        address _owner = _order.owner;
        address _seller = _order.seller;
        uint256 _totalPrice = _order.totalPrice;
        uint256 _purchasedItemCount = _order.purchasedItemCount;
        string memory _date = _order.date;
        string memory _time = _order.time;
        Status _state = _order.state;

        //add the order to the acceptedOrder mapping for the fd
        uint256 k = 0;
        for (k = 0; k <= foodDeliveriesCount; k++) {
            if (foodDeliveries[k].owner == msg.sender) {
                (foodDeliveries[k].ordersAcceptedCount)++;
                foodDeliveries[k].ordersAccepted[
                    foodDeliveries[k].ordersAcceptedCount
                ] = Order(
                    foodDeliveries[k].ordersAcceptedCount,
                    _owner,
                    _seller,
                    msg.sender,
                    _totalPrice,
                    _purchasedItemCount,
                    _date,
                    _time,
                    _state,
                    false
                );
            }
        }
    }

    //food delivery completes order delivery
    function fdCompleteOrder(uint256 _orderId) public {
        //set orderId state to OrderCompleted
        uint256 i = 0;
        for (i = 0; i <= ordersCount; i++) {
            if (orders[i].id == _orderId) {
                orders[i].state = Status.OrderCompleted;
            }
        }
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
