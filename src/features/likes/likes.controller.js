import { ApplicationError } from "../../error-handler/applicationError.js";
import { LikesModel } from "./likes.model.js";
import { LikesRepository } from "./likes.repository.js";

export class LikesController {
    async toggleLike(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const status = await LikesRepository.toggleLike(userId, postId);
            return res.status(200).send({ Status: status });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async getLikesOnPost(req, res, next) {
        try {
            const postId = req.params.postId;
            const likes = await LikesRepository.getLikesOnPost(postId);
            if (likes.length == 0) {
                return res.status(400).send("No likes on post");
            }
            return res.status(200).send(`Users who liked the post are: ${likes}`);
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    
}