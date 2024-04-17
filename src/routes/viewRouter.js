import { Router } from 'express';

const router = Router();

const products = [
    { id: '1', title: 'producto 1', price: '100' },
    { id: '2', title: 'producto 2', price: '101' },
    { id: '3', title: 'producto 3', price: '102' },
    { id: '4', title: 'producto 4', price: '103' },
    { id: '5', title: 'producto 5', price: '104' }
];

// Endpoint en la ruta raíz
router.get('/', (req, res) => {
    res.render('home', {
        title: 'mercadito || Fede',
        products,
        // styles: 'homeStyles.css'
    });
});

export default router;