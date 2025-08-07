import express from 'express';
import { PORT } from './config.js';
import routerClient from './routes/clients.routes.js'

const app = express();

app.use(express.json());
app.use(routerClient);

app.listen(PORT);
console.log('Server on port');
