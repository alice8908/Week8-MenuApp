// Create a menu app as seen in this week’s video. 
// What you create is up to you as long as
// it meets the following requirements:
// a. Use at least one array.
// b. Use at least two classes.
// c. Your menu should have the options
//    to create, view, and delete elements.

//-------------------------------------------------------------------

// This menu app is going to be about ordering food.
// to do so, I need informations from user about what food they want to order,
// name for the order, and what time do they want to pick up.


// Creating first class called customer.
// This is for the customer's name and time for pick up.
class Customer {
    constructor(name, time) {
        this.name = name;
        this.time = time;
    }

    describe() {
        return `${this.name} wants to pick up at  ${this.time}.`;
    }
}

// Creating second class called order.
// This is a class for what kind of food that user like to order.
class Order {
    constructor(name) {
        this.name = name;
        this.customers = [];
    }

    addCustomer(customer) {
        if (customer instanceof Customer) {
            this.customers.push(customer);
        } else {
            throw new Error(`You can only add an instance of Customer. Argument is not a customer: ${customer}`);
        }
    }

    describe() {
        return `${this.name} ordered by ${this.customers.length} customers.`;
    }
}

class Menu {
    constructor() {
        this.orders = [];
        this.selectedOrder = null;
    }

    start() {
        let selection = this.orderMainMenu();

        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createOrder();
                    break;
                case '2':
                    this.viewOrder();
                    break;
                case '3':
                    this.deleteOrder();
                    break;
                case '4':
                    this.allOrders();
                    break;
                default:
                    selection = 0;
            }
            selection = this.orderMainMenu();
        }

        alert('Closing Menu... Enjoy your meal!');
    }

// This is the part that user will see.
    orderMainMenu() {
        return prompt(`
        0) Exit Application
        1) Create New Order
        2) View My Order
        3) Delete Order
        4) All Orders
        `);
    }

// When user selects 2) View My Order, and type the right index number,
// User would get to see this menu.
    showOrderInfo(orderInfo) {
        return prompt(`
        0) Return to Main Menu
        1) Create New Order
        2) Delete Order
        *-------*-------*-------*
        ${orderInfo}
        `);
    }

// Display all the orders in.
    allOrders() {
        let orderString = '';
        for (let i = 0; i < this.orders.length; i++) {
            orderString += i + ') ' + this.orders[i].name + '\n';
        }
        alert(orderString);
    }

    createOrder() {
        let name = prompt('What would you like to order?');
        this.orders.push(new Order(name));
    }

    viewOrder() {
        let index = prompt('Please enter index number for the order');
        if (index > -1 && index < this.orders.length) {
            this.selectedOrder = this.orders[index];
            let description = 'Type of Food : ' + this.selectedOrder.name + '\n';
            
            for(let i = 0; i < this.selectedOrder.customers.length; i++) {
                description += i + ') ' + this.selectedOrder.customers[i].name
                 + ' - ' + this.selectedOrder.customers[i].time + '\n';
            }

            let selection = this.showOrderInfo(description);
            switch (selection) {
                case '1':
                    this.createCustomer();
                    break;
                case '2':
                    this.deleteCustomer();
            }
        }
    }

// Deleting Order. This option will make one index gone.
// include every information the "Customer" class has.
    deleteOrder() {
        let index = prompt('Please enter index number to delete order');
        if (index > -1 && index < this.orders.length) {
            this.orders.splice(index, 1);
        }
    }

// Creating customer. This is the place where user provides name, and time.
// for the first class "Customer"
    createCustomer() {
        let name = prompt('Enter your name for the order');
        let time = prompt('When would you like to pick up?');
        this.selectedOrder.customers.push(new Customer(name, time));
    }

// Deleting customer. This would make customer's name, and time gone.
// However, the order(Name of the food) will still exist.
    deleteCustomer() {
        let index = prompt('Please enter the index number to delete order');
        if (index > -1 && index < this.selectedOrder.customers.length) {
            this.selectedOrder.customers.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();