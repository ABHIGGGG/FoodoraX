import dotenv from 'dotenv';
dotenv.config();

import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import foodRouter from './routers/food.router.js';
import userRouter from './routers/user.router.js';
import orderRouter from './routers/order.router.js';
import uploadRouter from './routers/upload.router.js';

import { dbconnect } from './config/database.config.js';
import path, { dirname } from 'path';

dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
//middleware used to parse json request bodies
app.use(express.json());


//enable cors for frontend server that runs on port 3000
//cors allows cross origin requests from frontend to backend
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000'],
  })
);

//routes
//app.use(path, router) to use router for specific path
app.use('/api/foods', foodRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/upload', uploadRouter);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  const indexFilePath = path.join(publicFolder, 'index.html');
  res.sendFile(indexFilePath);
});


const PORT = process.env.PORT || 5001;
//start the server on specified port
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
