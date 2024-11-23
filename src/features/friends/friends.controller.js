import { ApplicationError } from "../../error-handler/applicationError.js";
import { FriendsRepository } from "./friends.repository.js";

export class FriendsController {

    async sendRequest(req, res, next) {
        try {
            const senderId = req.userId;
            const recipientId = req.params.id;
            const requestStatus = await FriendsRepository.sendRequest(senderId, recipientId);
            if (!requestStatus) {
                return res.status(404).send({ message: "Request not sent" });
            }
            return res.status(200).send({ message: requestStatus });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

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

    async acceptRequest(req, res, next) {
        try {
            const senderId = req.params.id;
            const userId = req.userId;
            const requestStatus = await FriendsRepository.acceptRequest(userId, senderId);
            if (!requestStatus) {
                return res.status(400).send({ message: "Unable to process the request" });
            }
            return res.status(200).send({ message: "Friend request accepted successfully", data: requestStatus });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async rejectRequest(req, res, next) {
        try {
            const senderId = req.params.id;
            const userId = req.userId;

            const rejectStatus = await FriendsRepository.rejectRequest(userId, senderId);

            // Handle the response and check for null values
            if (!rejectStatus) {
                return res.status(400).send({ message: "Unable to process the request" });
            }
            return res.status(200).send({ message: "Friend request rejected successfully" });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async removeFriend(req, res, next) {
        try {
            const friendId = req.params.id;
            const userId = req.userId;
            const unfriendStatus = await FriendsRepository.removeFriend(userId, friendId);
            if (!unfriendStatus) {
                return res.status(400).send({ message: "Unable to process the request" });
            }
            return res.status(200).send({ message: "Friend removed successfully" });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

}