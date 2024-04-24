import { Router } from 'express';
import { ProductManager } from '../servicios/productManager.js';
import { Product } from '../servicios/product.js';

export const productRouter = Router();

const productManager = new ProductManager();

productRouter.post('/', (req, res) => {
    try {
        const product = new Product(req.body);

        productManager.add(product);

        req.io.emit('new-product', product);

        res.json({ success: true, payload: product, message: 'Producto agregado' });
    } catch (error) {
        res.status(404).json({ success: false, payload: null, message: 'No se pudo agregar el producto' });
    }
});
productRouter.get('/', (req, res) => {
    try {
        const products = productManager.getProducts();
        res.json({ success: true, payload: products, message: 'Productos obtenidos' });
    } catch (error) {
        res.json({ success: false, payload: null, message: 'No se pudo obtener los productos' });
    }
});
