import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

const reqLogger = (req: Request, res: Response, next: NextFunction) => {

    const NAMESPACE = 'ReqLogger'
    const initTime = new Date().getTime();

    if(req.originalUrl === '/favicon.ico') return next();
    logger.info(NAMESPACE, `[Request] [METHOD]: ${req.method} [URL]: ${req.originalUrl}`);
    res.on('finish', () => {

        const endTime = new Date().getTime();
        logger.info(NAMESPACE, `[Response] [TOOK]: ${(endTime - initTime)}ms [METHOD]: ${req.method} [STATUS CODE]: ${res.statusCode} [URL]: ${req.originalUrl}`);
    })

    return next();
}

export default reqLogger