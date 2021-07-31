// SPDX-License-Identifier: Blockchain

pragma solidity ^0.5.4;

pragma experimental ABIEncoderV2;

contract Marketplace {
    //constructor
    // constructor() public {}

    // event LogRefund(
    //     address indexed receiver,
    //     uint256 amount,
    //     address indexed owner
    // );

    //FOOD DELIVERY
    struct FoodDelivery {
        uint256 id;
        address owner;
        string name;
        string email;
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
        string memory _email,
        string memory _phone
    ) public {
        require(msg.sender == _owner);
        // require(msg.sender == address(_owner));
        foodDeliveriesCount++;
        foodDeliveries[foodDeliveriesCount] = FoodDelivery(
            foodDeliveriesCount,
            msg.sender,
            _name,
            _email,
            _phone,
            5,
            false,
            0,
            0
        );
    }

    //SUPPLIER
    struct Supplier {
        uint256 id;
        address owner;
        string name;
        string email;
        string addressLocation;
        string phone;
        uint256 MOQ;
        uint256 leadTime;
        string deliveryDays;
        string remarks;
        uint256 avgRating;
        mapping(uint256 => Feedback) feedbacks;
        uint256 feedbackCount;
    }

    // Read/write Suppliers
    mapping(uint256 => Supplier) public suppliers;
    //Store Hawkers Count
    uint256 public suppliersCount;

    function addSupplier(
        address _owner,
        string memory _name,
        string memory _email,
        string memory _addressLocation,
        string memory _phone,
        uint256 _moq,
        uint256 _leadTime,
        string memory _deliveryDays,
        string memory _remarks
    ) public {
        require(msg.sender == _owner);
        // require(msg.sender == address(_owner));
        suppliersCount++;
        suppliers[suppliersCount] = Supplier(
            suppliersCount,
            msg.sender,
            _name,
            _email,
            _addressLocation,
            _phone,
            _moq,
            _leadTime,
            _deliveryDays,
            _remarks,
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
        string emailAddress;
        string phone;
        string openingHours;
        uint256 avgRating;
        string licenseHash;
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
        string memory _emailAddress,
        string memory _phone,
        string memory _openingHours,
        string memory _licenseHash
    ) public {
        require(msg.sender == _owner);
        // require(msg.sender == address(_owner));
        hawkersCount++;
        hawkers[hawkersCount] = Hawker(
            hawkersCount,
            msg.sender,
            _name,
            _addressLocation,
            _emailAddress,
            _phone,
            _openingHours,
            0,
            _licenseHash,
            false,
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
        uint256 size;
        uint256 minOrder;
        address payable owner;
        bool published;
        string imageHash;
    }
    struct SuppProfile {
        uint256 id;
        string name;
        string category;
        string location;
        string deliveryHours;
        address payable owner;
        string reviews;
        uint256 rating;
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
        uint256 soldCount;
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

    // event RestProdCreated(
    //     uint256 indexed id,
    //     uint256 indexed date,
    //     string name,
    //     uint256 price,
    //     address payable indexed owner,
    //     bool purchased,
    //     string imageHash
    // );

    // event SupplierProdCreated(
    //     uint256 indexed id,
    //     uint256 indexed date,
    //     string name,
    //     uint256 price,
    //     address payable indexed owner,
    //     bool purchased,
    //     string imageHash
    // );

    function createSuppProduct(
        string memory _name,
        uint256 _price,
        uint256 _size,
        uint256 _minOrder,
        bool _published,
        string memory _imageHash
    ) public {
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
            _size,
            _minOrder,
            msg.sender,
            _published,
            _imageHash
        );
        //trigger an event
        // emit SupplierProdCreated(
        //     suppProdCount,
        //     now,
        //     _name,
        //     _price,
        //     msg.sender,
        //     _published,
        //     _imageHash
        // );
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
            _imageHash,
            0
        );
        // Trigger an event
        // emit RestProdCreated(
        //     restProdCount,
        //     now,
        //     _name,
        //     _price,
        //     msg.sender,
        //     _published,
        //     _imageHash
        // );
    }

    //ORDERS
    enum Status {
        OrderPlaced,
        OrderConfirm,
        RiderConfirm,
        OrderCollected,
        OrderCompleted,
        OrderCancelled
    }
    Status public state;

    struct Order {
        uint256 id;
        address owner;
        address seller;
        address rider;
        uint256 hawkerPayment;
        uint256 riderPayment;
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
        uint256 productQty;
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
        require(msg.sender == _owner);
        // require(msg.sender == address(_owner));
        customersCount++;
        customers[customersCount] = Customer(
            customersCount,
            msg.sender,
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

    function editSupplierProfile(
        string memory _phone,
        uint256 _moq,
        uint256 _leadTime,
        string memory _deliveryDays,
        string memory _remarks
    ) public {
        uint256 i = 0;
        for (i = 0; i <= suppliersCount; i++) {
            if (suppliers[i].owner == msg.sender) {
                suppliers[i].phone = _phone;
                suppliers[i].MOQ = _moq;
                suppliers[i].leadTime = _leadTime;
                suppliers[i].deliveryDays = _deliveryDays;
                suppliers[i].remarks = _remarks;
            }
        }
    }

    function editProduct(
        uint256 _productId,
        string memory _name,
        uint256 _price,
        string memory _imageHash,
        bool _published
    ) public {
        uint256 i = 0;
        for (i = 0; i <= restProdCount; i++) {
            if (restProducts[i].id == _productId) {
                restProducts[i].name = _name;
                restProducts[i].price = _price;
                restProducts[i].imageHash = _imageHash;
                restProducts[i].published = _published;
            }
        }
    }

    function addToCart(uint256 _id, uint256 _prodQty) public {
        uint256 i = 0;
        for (i = 0; i <= customersCount; i++) {
            if (customers[i].owner == msg.sender) {
                (customers[i].itemCount)++;
                customers[i].cartItems[customers[i].itemCount] = CartItem(
                    customers[i].itemCount,
                    _id,
                    _prodQty
                );
            }
        }
    }

    function removeProdCart(uint256 custId, uint256 cartId) public {
        Customer storage cust = customers[custId];
        (cust.itemCount)--;
        delete cust.cartItems[cartId];
    }

    // function deleteProduct(uint256 productId) public {
    //     restProdCount--;
    //     delete restProducts[productId];
    // }

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
        returns (uint256, uint256)
    {
        Customer storage cust = customers[custId];
        return (
            cust.cartItems[cartId].productId,
            cust.cartItems[cartId].productQty
        );
    }

    function getOrderProduct(uint256 orderId, uint256 cartId)
        public
        returns (RestProduct memory, CartItem memory)
    {
        Order storage ord = orders[orderId];
        uint256 prodId = ord.purchasedItemId[cartId].productId;
        RestProduct memory _product = restProducts[prodId];
        CartItem memory _cart = ord.purchasedItemId[cartId];
        return (_product, _cart);
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
        uint256 _hawkerId,
        uint256 _hawkerRate,
        string memory _hawkerComment,
        uint256 _foodDeliveryId,
        uint256 _fdRate,
        string memory _fdComment
    ) public {
        orders[_orderId].rated = true;

        //set hawker feedback
        (hawkers[_hawkerId].feedbackCount)++;
        hawkers[_hawkerId].feedbacks[
            hawkers[_hawkerId].feedbackCount
        ] = Feedback(
            hawkers[_hawkerId].feedbackCount,
            hawkers[_hawkerId].owner,
            msg.sender,
            _hawkerRate,
            _hawkerComment
        );
        uint256 total = _hawkerRate + hawkers[_hawkerId].avgRating;
        uint256 avg = total / (hawkers[_hawkerId].feedbackCount);
        hawkers[_hawkerId].avgRating = avg;

        //set fd feedback
        (foodDeliveries[_foodDeliveryId].feedbackCount)++;
        foodDeliveries[_foodDeliveryId].feedbacks[
            foodDeliveries[_foodDeliveryId].feedbackCount
        ] = Feedback(
            foodDeliveries[_foodDeliveryId].feedbackCount,
            foodDeliveries[_foodDeliveryId].owner,
            msg.sender,
            _fdRate,
            _fdComment
        );
    }

    function cancelOrder(uint256 _orderId, address payable _customer)
        public
        payable
    {
        orders[_orderId].state = Status.OrderCancelled;
        address(_customer).transfer(orders[_orderId].totalPrice);
    }

    // event HawkerProdPurchased(
    //     uint256 orderId,
    //     address indexed buyer,
    //     address indexed seller,
    //     uint256 totalCost,
    //     uint256 indexed date
    // );

    function purchaseProduct(
        uint256 _custId,
        address payable _seller,
        uint256 _hawkerPayment,
        uint256 _riderPayment,
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
            _hawkerPayment,
            _riderPayment,
            _totalCost,
            cust.itemCount,
            _date,
            _time,
            state,
            false
        );

        //add the items in cartItems(Customer structure) to purchasedItemId (Order structure)
        for (uint256 i = 1; i <= cust.itemCount; i++) {
            (uint256 item, uint256 qty) = getCartProduct(_custId, i);
            orders[ordersCount].purchasedItemId[i] = CartItem(i, item, qty);

            //increate soldCount in RestProduct
            for (uint256 k = 1; k <= restProdCount; k++) {
                if (restProducts[k].id == item) {
                    restProducts[k].soldCount++;
                }
            }
        }

        //Require that there is enough Ether in the transaction
        require(msg.value >= _totalCost);

        //remove the CartItem in the Customer id
        removeAllProdCart(_custId);

        // //Trigger an event
        // emit HawkerProdPurchased(
        //     ordersCount,
        //     cust.owner,
        //     _seller,
        //     _totalCost,
        //     now
        // );
    }

    //hawker confirms order transaction made by customer
    function hawkerConfirmOrder(uint256 _orderId) public {
        orders[_orderId].state = Status.OrderConfirm;
        //Pay the hawker
        address(msg.sender).transfer(orders[_orderId].hawkerPayment);
    }

    //food delivery accepts order delivery
    function fdAcceptOrder(uint256 _orderId) public {
        //set orderId state to DriverConfirm
        orders[_orderId].state = Status.RiderConfirm;
        orders[_orderId].rider = msg.sender;
    }

    //food delivery collected order
    function fdCollectedOrder(uint256 _orderId) public {
        //set orderId state to OrderCompleted
        orders[_orderId].state = Status.OrderCollected;
    }

    //food delivery completes order delivery
    function fdCompleteOrder(uint256 _orderId, uint256 _fdId) public payable {
        //set orderId state to OrderCompleted
        orders[_orderId].state = Status.OrderCompleted;
        //Pay the rider after completion
        address(msg.sender).transfer(orders[_orderId].riderPayment);
        (foodDeliveries[_fdId].ordersAcceptedCount)++;
    }
}
