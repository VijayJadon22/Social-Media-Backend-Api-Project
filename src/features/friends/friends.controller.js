import { ApplicationError } from "../../error-handler/applicationError.js";
import { FriendsRepository } from "./friends.repository.js";

export class FriendsController {

    async getUserRequests(req, res, next) {
        try {
            const userId = req.userId;
            const requests = await FriendsRepository.getUserRequests(userId);
            if (!requests || requests.length == 0) {
                return res.status(400).send("No requests found");
            }
            return res.status(200).send({ requests });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async getUserFriends(req, res, next) {
        try {
            const userId = req.userId;
            const userFriends = await FriendsRepository.getUserFriends(userId);
            if (!userFriends || userFriends.length == 0) {
                return res.status(400).send("No friends found");
            }
            return res.status(200).send({ userFriends });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async toggleFriendship(req, res, next) {
        try {
            const userId = req.userId;
            const friendId = req.params.friendId;

            if (userId.toString() == friendId.toString()) {
                return res.status(400).send("Enter valid id");
            }

            const friendshipStatus = await FriendsRepository.toggleFriendship(userId, friendId);
            return res.status(200).send({ status: friendshipStatus });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async respondToRequest(req, res, next) {
        try {
            const userId = req.userId;
            const friendId = req.params.friendId;
            const action = req.body.action;

            const response = await FriendsRepository.respondToRequest(userId, friendId, action);
            return res.status(200).send({ status: response });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

}