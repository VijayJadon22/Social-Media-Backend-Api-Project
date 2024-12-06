import { ApplicationError } from "../error-handler/applicationError.js";
import jwt from 'jsonwebtoken';
import { userModel } from "../features/user/user.Schema.js";

export const jwtAuth = async (req, res, next) => {
    const token = req.headers["authorization"];
    // console.log(token);
    
    if (!token) {
        throw new ApplicationError("Unauthorized, Token expected", 401);
    }
    try {
        const payload = jwt.verify(token, "XqGKZo8C2z");
        // console.log(payload);

        /* 2nd check, looking for the token in token array of the userDocument, if user logout then 
        token wont be present */
        const userDocument = await userModel.findOne({ _id: payload.userId, tokens: token });
        if (!userDocument) {
            return res.status(401).json({ error: "Unauthorized, Token is invalid or expired" });
        }
        console.log(userDocument);

        req.userId = payload.userId; /*manually adding a key userId in request */
        req.userEmail = payload.userEmail;/*manually adding user email in request */
        req.token = token; 
        next();
    } catch (error) {
        next(error);
    }
}