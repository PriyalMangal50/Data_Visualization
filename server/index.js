import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet, { crossOriginResourcePolicy } from 'helmet';
import morgan from 'morgan';

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(helmet());
app.use(crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';

import User from './models/User.js';
import {dataUser} from './data/index.js';
import AffiliateStat from './models/AffiliateStat.js';
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
import Transaction from './models/Transaction.js';
import {dataProduct,dataProductStat } from './data/index.js';
import { dataTransaction } from './data/index.js';
import { dataOverallStat } from './data/index.js';
import OverallStat from './models/OverallStat.js';
import { dataAffiliateStat } from './data/index.js';

app.use("/client",clientRoutes);
app.use("/general",generalRoutes);
app.use("/management",managementRoutes);
app.use("/sales",salesRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        /*User.insertMany(dataUser);
        Product.insertMany(dataProduct);
        ProductStat.insertMany(dataProductStats);
        */
        //Transaction.insertMany(dataTransaction);
        //OverallStat.insertMany(dataOverallStat);
        //AffiliateStat.insertMany(dataAffiliateStat);
    });
}).catch((error)=>{
    console.log(error);
});