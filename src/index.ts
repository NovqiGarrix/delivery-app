import dotenv from 'dotenv';
import mongoose from 'mongoose';

import server from './util/server';
import logger from './config/logger';

dotenv.config();

const NAMESPACE = 'MainServer'
const PORT = +process.env.PORT! || 3001
const app = server();

process.on('unhandledRejection', () => {
    mongoose.connection.close();
    mongoose.disconnect();
    process.exit();
});
app.listen(PORT, () => logger.info(NAMESPACE, `Server running at port: ${PORT}`));

export { app }