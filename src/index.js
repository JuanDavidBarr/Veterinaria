import express from 'express';
import { PORT } from './config.js';
import routerClient from './routes/clients.routes.js'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routerClient);


app.listen(PORT);
console.log('Server on port');
