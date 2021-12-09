import dotenv from 'dotenv';

import { decodeBase64 } from '../util/base64';

dotenv.config();

export const jwtToken = {
    privateKey: decodeBase64(process.env.PRIVATE_KEY!),

    publicKey: decodeBase64(process.env.PUBLIC_KEY!)
}