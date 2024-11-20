import { ApplicationError } from "../error-handler/applicationError.js";
import jwt from 'jsonwebtoken';

export const jwtAuth = (req, res, next) => {
    const token = req.headers["authorization"];
    // console.log(token);
    
    if (!token) {
        throw new ApplicationError("Unauthorized, Token expected", 401);
    }
    try {
        const payload = jwt.verify(token, "XqGKZo8C2z");
        // console.log(payload);
        req.userId = payload.userId; /*manually adding a key userId in request */
        next();
    } catch (error) {
        next(error);
    }
}