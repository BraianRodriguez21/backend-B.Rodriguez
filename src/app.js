import express from "express";
import ProductManager from "./servicios/ProductManager"; 
import { v4 as uuidv4 } from 'uuid'; 

const app = express();
const port = 3000;
const productManager = new ProductManager();

app.use(express.json());

app.get('/products', async (req, res) => {
    let { limit } = req.query;
    limit = parseInt(limit);

    if (isNaN(limit) || limit < 0) {
        limit = undefined;
    }

    try {
        const products = await productManager.getProducts(); 
        const limitedProducts = limit ? products.slice(0, limit) : products;
        return res.json(limitedProducts);
    } catch (error) {
        return res.status(500).send("Error al recuperar los productos");
    }
});


app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(id); 
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        res.status(500).send("Error al buscar el producto");
    }
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});
