import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import productRouter from './routes/productRouter.js';
import handlebars from 'express-handlebars';
import { __dirname } from './util.js';
import { uploader } from './multer.js';

const app = express();
const server = http.createServer(app);
const Socketio = new Server(server);


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use(express.static(path.join(process.cwd(), 'public')));


app.use(express.json());


app.use('/api/products', productRouter);

app.get('/', (req, res) => {
res.render('home');
});


Socketio.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

export { Socketio };
