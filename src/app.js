import express from 'express';
import http from 'http';
import path from 'path';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import productRouter from './routes/productRouter.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.engine('handlebars', handlebars());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use('/api/products', productRouter);

io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');

    socket.on('nuevoProducto', (producto) => {
        io.emit('productoNuevo', producto);
    });

});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
