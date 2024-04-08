import fs from 'fs';

class ProductManager {
    constructor() {
        this.path = './files';
        this.fileName = `${this.path}/jsonProductos.json`;
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
        const products = await this.getProduct();

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error("Falta información");
        }

        if (products.find((prod) => prod.code === code)) {
            throw new Error("El código del producto ya existe");
        }

        const newProduct = {
            title,
            description,
            price: Number(price),
            thumbnail,
            code,
            stock: Number(stock),
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
        };

        products.push(newProduct);
        await fs.promises.writeFile(this.fileName, JSON.stringify(products));
        return newProduct;
    }

    async getProduct() {
        try {
            const infoJson = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(infoJson);
        } catch (error) {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getProduct();
        const product = products.find(prod => prod.id === id);
        return product ?? null; 
    }

    async deleteProduct(id) {
        const products = await this.getProduct();
        const filteredProducts = products.filter(prod => prod.id !== id);
        await fs.promises.writeFile(this.fileName, JSON.stringify(filteredProducts));
        return { deleted: id };
    }
}

export default ProductManager;