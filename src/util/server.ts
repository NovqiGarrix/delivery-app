import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import compression from 'compression';
import mongoose from 'mongoose';

// Middleware
import { RequestLogger } from '../middleware';

// Route or Versioning
import v1 from '../routes/v1';
import logger from '../config/logger';

dotenv.config();

const app = () => {
    const app = express();

    const NAMESPACE = 'CreateServer'
    const MONGODB_URL = process.env.MONGODB_URL as string

    app.use(cors());
    app.use(RequestLogger);
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.get('/', (_req, res) => res.sendStatus(200));

    app.use(`/api/v1`, v1);

    mongoose.connect(MONGODB_URL).then(() => logger.info(NAMESPACE, `Mongodb Connected!`)).catch((err) => logger.error(NAMESPACE, err.message));
    return app
}

export default app