import { ApplicationError } from "../../error-handler/applicationError.js";
import { friendsModel } from "./friends.schema.js";


export class FriendsRepository {
    static async sendRequest(senderId, recipientId) {
        try {
            const recipient = await friendsModel.findOne({ userId: recipientId });

            // If the recipient does not exist throw an error
            if (!recipient) {
                throw new ApplicationError("User does not exist", 404);
            }
            // Check if already friends
            if (recipient.friends.includes(senderId)) {
                return "User is already a friend";
            }
            // Check if request already sent
            if (recipient.requests.includes(senderId)) {
                return "Request Already sent";
            }
            // Add senderId to the recipient's requests array
            recipient.requests.push(senderId);
            await recipient.save();
            return "Request sent successfully";
        } catch (error) {
            throw error;
        }
    }

    static async getUserRequests(userId) {
        try {
            const userDocument = await friendsModel.findOne({ userId });
            if (!userDocument) {
                throw new ApplicationError("User does not exist", 404);
            }
            return userDocument.requests;
        } catch (error) {
            throw error;
        }
    }
    static async getUserFriends(userId) {
        try {
            const userDocument = await friendsModel.findOne({ userId });
            if (!userDocument) {
                throw new ApplicationError("User does not exist", 404);
            }
            return userDocument.friends;
        } catch (error) {
            throw error;
        }
    }

    static async acceptRequest(userId, senderId) {
        try {
            const userDocument = await friendsModel.findOne({ userId });
            // Check if the request exists
            if (!userDocument.requests.includes(senderId)) {
                throw new ApplicationError("Request not found", 404);
            }
            // Add senderId to the friends array
            userDocument.friends.push(senderId);

            // Remove senderId from the requests array
            userDocument.requests = userDocument.requests.filter(id => id.toString() != senderId.toString());

            // Save the updated document
            await userDocument.save();

            // Also add userId to the sender's friends array
            const sendersDocument = await friendsModel.findOne({ userId: senderId });
            sendersDocument.friends.push(userId);
            await sendersDocument.save();

            return userDocument;
        } catch (error) {
            throw error;
        }
    }


    static async rejectRequest(userId, senderId) {
        try {
            const userDocument = await friendsModel.findOne({ userId });

            // Check if the request exists
            if (!userDocument.requests.includes(senderId)) {
                throw new ApplicationError("Friend request not found", 404);
            }

            // Remove senderId from the requests array
            userDocument.requests = userDocument.requests.filter(id => id.toString() != senderId.toString());

            // Save the updated document
            await userDocument.save();

            return userDocument;
        } catch (error) {
            throw error;
        }
    }

    static async removeFriend(userId, friendId) {
        try {
            // Find user document
            const userDocument = await friendsModel.findOne({ userId });
            if (!userDocument.friends.includes(friendId)) {
                throw new ApplicationError("User is not a friend", 404);
            }

            // Remove friendId from user's friends list
            userDocument.friends = userDocument.friends.filter(id => id.toString() !== friendId.toString());
            await userDocument.save();

            // Remove userId from friend's friends list
            const friendDocument = await friendsModel.findOne({ userId: friendId });
            friendDocument.friends = friendDocument.friends.filter(id => id.toString() !== userId.toString());
            await friendDocument.save();

            return userDocument;
        } catch (error) {
            throw error;
        }
    }



}