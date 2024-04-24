import express from 'express';
import { viewRouter } from './routes/viewrouter.js';
import { handlebarsConf } from './config/handlebarsConfig.js';
import { productRouter } from './routes/productRouter.js';
import { socketConf } from './config/socketConfig.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const httpServer = app.listen(8080, () => console.log('Servidor en el puerto 8080'));

handlebarsConf(app);

const io = socketConf(httpServer);

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/', viewRouter);
app.use('/api/products', productRouter);

export { app };
