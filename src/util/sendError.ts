import { Response } from "express";

const sendHTTPError = <T>(res: Response, message: T, code: number = 500): Response => {

    const response = {
        data: null,
        error: message
    }

    return res.status(code).json(response)

}

export default sendHTTPError