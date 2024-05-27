import express from 'express';
import mongoose from 'mongoose';
import { viewRouter } from './routes/viewRouter.js';
import { handlebarsConf } from './config/handlebarsConfig.js';
import  productRouter  from './routes/productRouter.js';
import { cartRouter } from './routes/cartRouter.js'; 
import { socketConf } from './config/socketConfig.js';
import { sessionConfig } from './config/sessionConfig.js';
import { passportConfig } from './config/passportConfig.js';
import { authRouter } from './routes/authRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const httpServer = app.listen(8080, () => console.log('Servidor en el puerto 8080'));

handlebarsConf(app);
sessionConfig(app);
passportConfig(app);

const io = socketConf(httpServer);

app.use((req, res, next) => {
    req.io = io;
    res.locals.user = req.user;
    next();
});

//mongoose.connect('mongodb+srv://braianrodriguez:ReinosXan21@ecommercegaming.dyihcoy.mongodb.net/Ecommerce?retryWrites=true&w=majority&appName=EcommerceGaming', {
mongoose.connect('mongodb://localhost:27017', {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Mongo connected'))
  .catch(err => console.error('error:', err));

app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter); 
app.use('/auth', authRouter);

export { app };
