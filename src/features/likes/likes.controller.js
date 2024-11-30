import { ApplicationError } from "../../error-handler/applicationError.js";
import { LikesModel } from "./likes.model.js";
import { LikesRepository } from "./likes.repository.js";

export class LikesController {
    async toggleLikeOnPostOrComment(req, res, next) {
        try {
            const id = req.params.id;
            const userId = req.userId;
            const type = req.body.type; //type can only be either post or comment
            if (!type) {
                return res.status(400).send("Type needed, post or comment");
            }
            const toggleStatus = await LikesRepository.toggleLikeOnPostOrComment(id, userId, type);
            return res.status(200).send({ status: toggleStatus });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async getLikesOnPostOrComment(req, res, next) {
        try {
            const id = req.params.id;
            const likes = await LikesRepository.getLikesOnPostOrComment(id);

            if (!likes || likes.length === 0) {
                return res.status(400).send("No likes");
            }
            return res.status(200).send({ likes: likes });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    
}