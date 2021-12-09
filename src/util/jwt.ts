import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { jwtToken } from '../config/jwt.key';

dotenv.config();

const JWT_PRIVATE = jwtToken.privateKey
const JWT_PUBLIC = jwtToken.publicKey

interface JwtReturn {
    valid: boolean;
    data: any;
    expired?: string
}

const decodeToken = <T>(token: string): JwtReturn => {

    try {
        const decoded = jwt.decode(token) as T

        return {
            valid: true,
            data: decoded,
        }
    } catch (error: any) {
        return {
            valid: true,
            data: null,
            expired: error.message === 'jwt expired' ? 'EXPIRED!' : error.message
        }
    }

}

const signToken = (data: Object, options?: jwt.SignOptions): string => {
    return jwt.sign(data, JWT_PRIVATE, { ...(options && options), algorithm: 'RS256' });
}

const verifyToken = <T>(token: string) => {
    try {

        const verifiedToken = jwt.verify(token, JWT_PUBLIC) as T

        return {
            valid: true,
            data: verifiedToken,
            message: "OK!"
        }

    } catch (error: any) {
        return {
            valid: false,
            data: null,
            message: error.message === "jwt expired" ? "EXPIRED!" : error.message as string
        }
    }
}

export default { decodeToken, signToken, verifyToken }