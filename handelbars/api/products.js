class ProductsApi {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    add(product) {
        if(product.title === '' || typeof product.title === 'undefined') {
            return false;
        }
        product.id = this.products.length + 1;
        this.products.push(product);
        return product;
    }

    getAll() {
        if(this.products.length < 1) {
            return false;
        }
        return this.products;
    }

    getById(id) {
        return this.products.find((prod) => prod.id == id);
    }

    update(product, id) {
        this.products = this.products.map((prod) => {
            if(prod.id == id) {
                prod.title = product.title;
                prod.price = product.price;
            }
            return prod;
        });
    }

    delete(id) {
        this.products = this.products.filter((prod) => prod.id != id);
    }

}

module.exports = ProductsApi;