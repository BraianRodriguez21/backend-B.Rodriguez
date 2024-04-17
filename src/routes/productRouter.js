import express from 'express';

const router = express.Router();

const products = [
    { id: '1', title: 'Producto 1', price: '100' },
    { id: '2', title: 'Producto 2', price: '101' },
    { id: '3', title: 'Producto 3', price: '102' },
    { id: '4', title: 'Producto 4', price: '103' },
    { id: '5', title: 'Producto 5', price: '104' }
];

router.get('/', (req, res) => {
    res.render('home', { products });
});

export default router;
