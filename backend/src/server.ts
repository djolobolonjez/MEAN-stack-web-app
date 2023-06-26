import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import UserRouter from './routers/user.routes';
import AgencyRouter from './routers/agency.routes';
import ClientRouter from './routers/client.routes';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/projekat2023');
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('connected to db');
})

const router = express.Router();
router.use('/user', UserRouter);
router.use('/client', ClientRouter);
router.use('/agency', AgencyRouter);

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));