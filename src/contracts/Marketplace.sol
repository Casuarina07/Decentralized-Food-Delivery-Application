// SPDX-License-Identifier: Blockchain

pragma solidity ^0.5.4;

pragma experimental ABIEncoderV2;

contract Marketplace {
    //FOOD DELIVERY
    struct FoodDelivery {
        uint256 id;
        address owner;
        // string name;
        // string email;
        // string phone;
        string profileHash;
        int256 rating;
        bool available;
        // mapping(uint256 => Order) ordersAccepted;
        uint256 ordersAcceptedCount;
        mapping(uint256 => Feedback) feedbacks;
        uint256 feedbackCount;
    }

    // Read/write Food Delivery
    mapping(uint256 => FoodDelivery) public foodDeliveries;
    //Store Food Delivery Count
    uint256 public foodDeliveriesCount;

    //add new food delivery
    function addFoodDelivery(address _owner, string memory _profileHash)
        public
    {
        require(msg.sender == _owner);
        // require(msg.sender == address(_owner));
        foodDeliveriesCount++;
        foodDeliveries[foodDeliveriesCount] = FoodDelivery(
            foodDeliveriesCount,
            msg.sender,
            _profileHash,
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
        string profileHash;
        uint256 avgRating;
        mapping(uint256 => Feedback) feedbacks;
        uint256 feedbackCount;
    }

    // Read/write Suppliers
    mapping(uint256 => Supplier) public suppliers;
    //Store Suppliers Count
    uint256 public suppliersCount;

    function addSupplier(address _owner, string memory _profileHash) public {
        require(msg.sender == _owner);
        // require(msg.sender == address(_owner));
        suppliersCount++;
        suppliers[suppliersCount] = Supplier(
            suppliersCount,
            msg.sender,
            _profileHash,
            0,
            0
        );
    }

    //HAWKER
    struct Hawker {
        uint256 id;
        address owner;
        string profileHash;
        uint256 avgRating;
        bool open;
        mapping(uint256 => Feedback) feedbacks;
        uint256 feedbackCount;
        mapping(uint256 => CartItem) cartItems;
        uint256 itemCount;
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

    function addHawker(address _owner, string memory _profileHash) public {
        require(msg.sender == _owner);
        hawkersCount++;
        hawkers[hawkersCount] = Hawker(
            hawkersCount,
            msg.sender,
            _profileHash,
            0,
            false,
            0,
            0
        );
    }

    function editHawkerProfile(uint256 _id, string memory _profileHash) public {
        hawkers[_id].profileHash = _profileHash;
    }

    //change shop status
    function boolOpen(uint256 _id) public {
        hawkers[_id].open = !(hawkers[_id].open);
    }

    //change food delivery status
    function boolWork(uint256 _id) public {
        foodDeliveries[_id].available = !(foodDeliveries[_id].available);
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
        string expiryDate;
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

    function createSuppProduct(
        string memory _name,
        uint256 _price,
        uint256 _size,
        uint256 _minOrder,
        bool _published,
        string memory _imageHash,
        string memory _expiryDate
    ) public {
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
            _imageHash,
            _expiryDate
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
            _imageHash,
            0
        );
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
        string dateTime;
        string deliveryDateTime;
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
        // string name;
        // string addressLocation;
        // string phone;
        string profileHash;
        mapping(uint256 => CartItem) cartItems;
        uint256 itemCount;
    }

    mapping(uint256 => Customer) public customers;
    uint256 public customersCount;

    function addCustomer(address _owner, string memory _profileHash) public {
        require(msg.sender == _owner);
        customersCount++;
        customers[customersCount] = Customer(
            customersCount,
            msg.sender,
            _profileHash,
            0
        );
    }

    function editCustProfile(uint256 _id, string memory _profileHash) public {
        customers[_id].profileHash = _profileHash;
    }

    function editSupplierProfile(uint256 _id, string memory _profileHash)
        public
    {
        suppliers[_id].profileHash = _profileHash;
    }

    function editProduct(
        uint256 _productId,
        string memory _name,
        uint256 _price,
        string memory _imageHash,
        bool _published
    ) public {
        restProducts[_productId].name = _name;
        restProducts[_productId].price = _price;
        restProducts[_productId].imageHash = _imageHash;
        restProducts[_productId].published = _published;
    }

    function editSuppProduct(
        uint256 _productId,
        string memory _name,
        uint256 _price,
        uint256 _size,
        uint256 _minOrder,
        string memory _imageHash,
        bool _published
    ) public {
        suppProducts[_productId].name = _name;
        suppProducts[_productId].price = _price;
        suppProducts[_productId].size = _size;
        suppProducts[_productId].minOrder = _minOrder;
        suppProducts[_productId].imageHash = _imageHash;
        suppProducts[_productId].published = _published;
    }

    function addToCart(
        uint256 _custId,
        uint256 _prodId,
        uint256 _prodQty
    ) public {
        (customers[_custId].itemCount)++;
        customers[_custId].cartItems[customers[_custId].itemCount] = CartItem(
            customers[_custId].itemCount,
            _prodId,
            _prodQty
        );
    }

    function addToCartHawker(
        uint256 _hawkerId,
        uint256 _prodId,
        uint256 _prodQty
    ) public {
        (hawkers[_hawkerId].itemCount)++;
        hawkers[_hawkerId].cartItems[hawkers[_hawkerId].itemCount] = CartItem(
            hawkers[_hawkerId].itemCount,
            _prodId,
            _prodQty
        );
    }

    function removeProdCart(uint256 custId, uint256 cartId) public {
        Customer storage cust = customers[custId];
        (cust.itemCount)--;
        delete cust.cartItems[cartId];
    }

    //indicator - 1 for customer, 2 for hawker
    function removeAllProdCart(uint256 _id, uint256 _indicator) public {
        if (_indicator == 1) {
            Customer storage cust = customers[_id];
            uint256 _itemCount = cust.itemCount;
            for (uint256 i = 1; i <= _itemCount; i++) {
                delete cust.cartItems[i];
            }
            (cust.itemCount) = 0;
        } else {
            Hawker storage hawker = hawkers[_id];
            uint256 _itemCount = hawker.itemCount;
            for (uint256 i = 1; i <= _itemCount; i++) {
                delete hawker.cartItems[i];
            }
            (hawker.itemCount) = 0;
        }
    }

    //if indicator is 1 then cust, 2 then hawker
    function getCartProduct(
        uint256 id,
        uint256 cartId,
        uint256 indicator
    ) public returns (uint256, uint256) {
        if (indicator == 1) {
            Customer storage cust = customers[id];
            return (
                cust.cartItems[cartId].productId,
                cust.cartItems[cartId].productQty
            );
        } else {
            Hawker storage hawker = hawkers[id];
            return (
                hawker.cartItems[cartId].productId,
                hawker.cartItems[cartId].productQty
            );
        }
    }

    function getOrderProduct(uint256 orderId, uint256 cartId)
        public
        returns (CartItem memory)
    {
        Order storage ord = orders[orderId];
        uint256 prodId = ord.purchasedItemId[cartId].productId;
        CartItem memory _cart = ord.purchasedItemId[cartId];
        return (_cart);
    }

    function getHawkerFeedback(uint256 hawkerId, uint256 feedbackCount)
        public
        returns (Feedback memory)
    {
        Hawker storage hawker = hawkers[hawkerId];
        Feedback memory _feedback = hawker.feedbacks[feedbackCount];
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

    //indicator  1 - customer, 2 - hawker
    function purchaseProduct(
        uint256 _indicator,
        uint256 _id,
        address payable _seller,
        uint256 _hawkerPayment,
        uint256 _riderPayment,
        uint256 _totalCost,
        string memory _dateTime,
        string memory _deliveryDateTime
    ) public payable {
        if (_indicator == 1) {
            Customer memory cust = customers[_id];
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
                _dateTime,
                _deliveryDateTime,
                state,
                false
            );

            //add the items in cartItems(Customer structure) to purchasedItemId (Order structure)
            for (uint256 i = 1; i <= cust.itemCount; i++) {
                (uint256 item, uint256 qty) = getCartProduct(_id, i, 1);
                orders[ordersCount].purchasedItemId[i] = CartItem(i, item, qty);

                restProducts[item].soldCount++;
            }

            //Require that there is enough Ether in the transaction
            require(msg.value >= _totalCost);

            //remove the CartItem in the Customer id
            removeAllProdCart(_id, 1);
        } else {
            Hawker memory hawker = hawkers[_id];
            // Increment order count
            ordersCount++;
            // Create the enum
            state = Status.OrderPlaced;

            // Create the order
            orders[ordersCount] = Order(
                ordersCount,
                hawker.owner,
                _seller,
                address(0),
                _hawkerPayment,
                _riderPayment,
                _totalCost,
                hawker.itemCount,
                _dateTime,
                _deliveryDateTime,
                state,
                false
            );

            //add the items in cartItems(Customer structure) to purchasedItemId (Order structure)
            for (uint256 i = 1; i <= hawker.itemCount; i++) {
                (uint256 item, uint256 qty) = getCartProduct(_id, i, 2);
                orders[ordersCount].purchasedItemId[i] = CartItem(i, item, qty);

                //restProducts[item].soldCount++;
            }

            //Require that there is enough Ether in the transaction
            require(msg.value >= _totalCost);
            removeAllProdCart(_id, 2);
        }
    }

    //hawker confirms order transaction made by customer
    function hawkerConfirmOrder(uint256 _orderId, string memory _estTime)
        public
    {
        orders[_orderId].state = Status.OrderConfirm;
        orders[_orderId].deliveryDateTime = _estTime;
        // setOrderDeliveryTime(_orderId, _estTime);
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
    function fdCompleteOrder(
        uint256 _orderId,
        uint256 _fdId,
        string memory _dateTime
    ) public payable {
        //set orderId state to OrderCompleted
        orders[_orderId].state = Status.OrderCompleted;
        orders[_orderId].deliveryDateTime = _dateTime;
        //Pay the rider after completion
        address(msg.sender).transfer(orders[_orderId].riderPayment);
        (foodDeliveries[_fdId].ordersAcceptedCount)++;
    }
}
