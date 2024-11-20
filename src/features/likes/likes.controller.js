import { ApplicationError } from "../../error-handler/applicationError.js";
import { LikesModel } from "./likes.model.js";

export class LikesController {
    toggleLike(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const status = LikesModel.toggleLike(userId, postId);
            return res.status(200).send({ Status: status });
        } catch (error) {
            next(error);
        }
    }

    getLikesOnPost(req, res, next) {
        try {
            const postId = req.params.postId;
            const likes = LikesModel.getLikesOnPost(postId);
            if (!likes) {
                return res.status(400).send("No likes on post");
            }
            return res.status(200).send(`user who liked are: ${likes}`);
        } catch (error) {
            next(error);
        }
    }
}