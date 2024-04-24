import express from 'express';
import { ProductManager } from '../servicios/ProductManager.js';

const router = express.Router();
const productManager = new ProductManager();

router.get('/', (req, res) => {
    const products = productManager.getProducts();
    res.json(products);
});

router.post('/', (req, res) => {
    const { title, price } = req.body;
    if (!title || !price) {
        return res.status(400).json({ error: 'Se requieren título y precio para agregar un producto' });
    }
    const newProduct = { title, price };
    productManager.add(newProduct);
    res.status(201).json({ message: 'Producto agregado correctamente', product: newProduct });
});

export { router };

