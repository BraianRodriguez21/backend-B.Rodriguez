import fs from 'fs';

class productManager {
    constructor() {
        this.product = [];
        this.id = 0;
        this.path = './files';
        this.fileName = this.path + '/jsonProductos.json';
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        await fs.promises.mkdir(this.path, { recursive: true });

        if (!(title && description && price && thumbnail && code && stock)) {
            console.log("Falta información");
        } else if (this.product.find((prod) => prod.code === code)) {
            console.log("El código del producto ya existe");
        } else {
            const prodAdd = { title, description, price, thumbnail, code, stock, id: this.id++ };
            this.product.push(prodAdd);
            console.log("Producto agregado");
        }
        const currentProducts = await this.getProduct();
        currentProducts.push(...this.product);
        await fs.promises.writeFile(this.fileName, JSON.stringify(currentProducts));
    }

    getProduct = async () => {
        try {
            const InfoJson = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(InfoJson);
        } catch (error) {
            return [];
        }
    }

    getProductById = async (id) => {
        const InfoJson = await this.getProduct();
        const product = InfoJson.find(prod => prod.id === id);
        return product ?? 'No se encontró el producto';
    }

    deleteProduct = async (id) => {
        let InfoJson = await this.getProduct();
        const filteredProducts = InfoJson.filter(prod => prod.id !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(filteredProducts));
    }
}

const product = new productManager();

// product.getProductById(0);
// product.deleteProduct(0);
// product.getProduct();
product.addProduct("mouse", "xd", "4000", 'thumbnail', "68", "55");

export default productManager;
