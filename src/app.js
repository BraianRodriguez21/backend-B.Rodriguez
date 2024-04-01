import express from "express";
import productManager from "./servicios/productManager";

const app = express();
const port = 3000;

const products =  new productManager

app.get('/products', (req, res) => {
    const { code } = req.query;
    let { limit } = req.query;

    if (!code || (code !== '18' && code !== '19')) {
        return res.send("Código de producto no válido");
    }

    limit = parseInt(limit);
    if (isNaN(limit) || limit <= 0) {
        return res.send("El límite debe ser un número válido mayor que cero");
    }

    const filteredProducts = products.filter(product => product.code === code);


    const result = limit ? filteredProducts.slice(0, limit) : filteredProducts;

    return res.json(result);
});

app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});
