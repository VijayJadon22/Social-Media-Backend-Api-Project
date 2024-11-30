import { ApplicationError } from "../../error-handler/applicationError.js";
import { commentModel } from "../comments/comments.schema.js";
import { postModel } from "../posts/posts.schema.js";
import { userModel } from "../user/user.Schema.js";
import { likeModel } from "./likes.schema.js";


export class LikesRepository {

    static async getLikesOnPostOrComment(id) {
        try {
            // Find likes where either postId or commentId matches the provided ID
            const likes = await likeModel.find({
                $or: [
                    { postId: id },
                    { commentId: id }
                ]
            }).populate("userId", "name"); // Populate userId field with only the name

            return likes;
        } catch (error) {
            throw error;
        }
    }

    static async toggleLike(userId, id, type) {
        try {
            const query = type === 'post' ? { userId, postId: id } : { userId, commentId: id };

            // Check if the like already exists
            const existingLike = await likeModel.findOne(query);

            if (existingLike) {
                // If the like exists, remove it (toggle off)
                await likeModel.deleteOne(query);
                return 'Like removed';
            } else {
                // If the like does not exist, add it (toggle on)
                await likeModel.create(query);
                return 'Like added';
            }
        } catch (error) {
            throw error;
        }
    }



}