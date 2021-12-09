import dotenv from 'dotenv';

dotenv.config();

export const jwtToken = {
    privateKey: process.env.PRIVATE_KEY,

    publicKey: process.env.PUBLIC_KEY
}