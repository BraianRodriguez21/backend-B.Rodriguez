import express from "express";
import productManager from "./servicios/ProductManagerroductManager";

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
        const products = await productManager.getProduct(); // Asumiendo que esto devuelve todos los productos
        const limitedProducts = limit ? products.slice(0, limit) : products;
        return res.json(limitedProducts);
    } catch (error) {
        return res.status(500).send("Error al recuperar los productos");
    }
});

app.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const product = await productManager.getProductById(parseInt(id));
        if (product) {
            res.json(product);
        } else {
            res.status().send("Producto no encontrado");
        }
    } catch (error) {
        res.status().send("Error al buscar el producto");
    }
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});