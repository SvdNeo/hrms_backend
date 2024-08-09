import express from 'express';
import cors from 'cors';
import { adminRouter } from './Routes/Adminroutes.js';

const app = express();


const corsOptions = {
  origin: 'http://localhost:3002', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', adminRouter);

app.listen(4001, () => {
  console.log('Server is running on port 4001');
});
