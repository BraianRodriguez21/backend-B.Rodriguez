// import express from 'express';
// const router = express.Router();

// const products = [
//     { id: '1', title: 'producto 1', price: '100' },
//     { id: '2', title: 'producto 2', price: '101' },
//     { id: '3', title: 'producto 3', price: '102' },
//     { id: '4', title: 'producto 4', price: '103' },
//     { id: '5', title: 'producto 5', price: '104' }
// ];

// router.get('/', (req, res) => {
//     res.render('home', {
//         title: 'Ecommerce || Braian',
//         products,
//     });
// });

// export { router }; 


import { Router } from 'express';

export const viewRouter = Router();


viewRouter.get('/', async (req, res) => {
	
	const response = await fetch('http://localhost:8080/api/products');

	const data = await response.json();

	res.render('home', {
		books: data.payload,
	});
});
