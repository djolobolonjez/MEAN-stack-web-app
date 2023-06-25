import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserRouter from './routers/user.routes';
import AgencyRouter from './routers/agency.routes';

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat2023');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connected to db');
})

const router = express.Router();
router.use('/user', UserRouter);
router.use('/agency', AgencyRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));