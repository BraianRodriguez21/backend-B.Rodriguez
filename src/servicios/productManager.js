import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'; 

class ProductManager {
    constructor() {
        this.path = './files';
        this.fileName = `${this.path}/products.json`; 
    }

    async init() {
        await fs.promises.mkdir(this.path, { recursive: true });
        try {
            await fs.promises.access(this.fileName);
        } catch (error) {
            await fs.promises.writeFile(this.fileName, JSON.stringify([]));
        }
    }

    async addProduct(title, description, price, thumbnail, code, stock) {
        await this.init();
        const products = await this.getProducts(); 

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Falta información");
        }

        if (products.find((prod) => prod.code === code)) {
            throw new Error("El código del producto ya existe");
        }

        const newProduct = {
            id: uuidv4(), 
            title,
            description,
            price: Number(price),
            thumbnail,
            code,
            stock: Number(stock),
        };

        products.push(newProduct);
        await fs.promises.writeFile(this.fileName, JSON.stringify(products, null, 2)); 
        return newProduct;
    }

    async getProducts() { 
        try {
            const infoJson = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(infoJson);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProducts(); 
        const product = products.find(prod => prod.id === id);
        return product ?? null; 
    }

    async deleteProduct(id) {
        const products = await this.getProducts(); 
        const filteredProducts = products.filter(prod => prod.id !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(filteredProducts, null, 2)); 
        return { deleted: id };
    }
}

export default ProductManager;
