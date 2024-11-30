import { ApplicationError } from "../../error-handler/applicationError.js";
import { friendsModel } from "./friends.schema.js";


export class FriendsRepository {
    
    static async getUserRequests(userId) {
        try {
            // Find the user document and populate the requests field with user names
            const userDocument = await friendsModel.findOne({ userId }).populate("requests", "name");

            if (!userDocument) {
                throw new ApplicationError("User does not exist", 404);
            }

            // Extract the names of the users in the requests array
            const userRequests = userDocument.requests.map(request => request.name);

            return userRequests;
        } catch (error) {
            throw error;
        }
    }

    static async getUserFriends(userId) {
        try {
            const userDocument = await friendsModel.findOne({ userId }).populate("friends", "name");
            if (!userDocument) {
                throw new ApplicationError("User does not exist", 404);
            }
            const friendsName = userDocument.friends.map(friend => friend.name);
            return friendsName;
        } catch (error) {
            throw error;
        }
    }

    static async toggleFriendship(userId, friendId) {
        try {
            const userDocument = await friendsModel.findOne({ userId });
            const friendDocument = await friendsModel.findOne({ userId: friendId });

            if (!userDocument || !friendDocument) {
                throw new ApplicationError("User or friend does not exist", 404);
            }

            // Check if they are already friends
            const isFriend = userDocument.friends.includes(friendId);
            if (isFriend) {
                // Remove from both friends lists if they are already friends
                userDocument.friends.pull(friendId);
                friendDocument.friends.pull(userId);
                await userDocument.save();
                await friendDocument.save();
                return 'Friend removed';
            }

            // Check if there is already a pending friend request from friendId
            const isRequestReceived = userDocument.requests.includes(friendId);
            if (isRequestReceived) {
                // Accept the friend request
                userDocument.friends.push(friendId);
                friendDocument.friends.push(userId);
                userDocument.requests.pull(friendId);
                await userDocument.save();
                await friendDocument.save();
                return 'Friend request accepted';
            }

            // Check if there is already a pending friend request from userId to friendId
            const isRequestSent = friendDocument.requests.includes(userId);
            if (isRequestSent) {
                return 'Friend request already sent';
            }

            // If no existing friendship or request, send a new friend request
            friendDocument.requests.push(userId);
            await friendDocument.save();
            return 'Friend request sent';
        } catch (error) {
            throw error;
        }
    }

    static async respondToRequest(userId, friendId, action) {
        try {
            const userDocument = await friendsModel.findOne({ userId });
            const friendDocument = await friendsModel.findOne({ userId: friendId });

            if (!userDocument || !friendDocument) {
                throw new ApplicationError("User or friend does not exist", 404);
            }

            // Check if there's a pending friend request from friendId
            const isRequestReceived = userDocument.requests.includes(friendId);
            if (!isRequestReceived) {
                return 'No friend request found';
            }

            if (action === 'accept') {
                // Accept the friend request
                userDocument.friends.push(friendId);
                friendDocument.friends.push(userId);
                userDocument.requests.pull(friendId);
                await userDocument.save();
                await friendDocument.save();
                return 'Friend request accepted';
            }

            if (action === 'reject') {
                // Reject the friend request
                userDocument.requests.pull(friendId);
                await userDocument.save();
                return 'Friend request rejected';
            }

            return 'Invalid action';
        } catch (error) {
            throw error;
        }
    }
}