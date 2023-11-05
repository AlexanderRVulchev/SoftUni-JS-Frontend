class Storage {
    constructor(capacity) {
        this.capacity = capacity;
        this.storage = [];
    }

    get totalCost() {
        let sum = 0;
        this.storage.forEach(item => sum += item.price * item.quantity);
        return sum;        
    }

    addProduct(product) {
        this.storage.push(product);
        this.capacity -= product.quantity;
    }

    getProducts() {
        let output = "";
        output = this.storage.map(x => JSON.stringify(x)).join("\n");
        return output;
    }
}