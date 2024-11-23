import { ApplicationError } from "../../error-handler/applicationError.js";
import { commentModel } from "../comments/comments.schema.js";
import { postModel } from "../posts/posts.schema.js";
import { userModel } from "../user/user.Schema.js";
import { likeModel } from "./likes.schema.js";


export class LikesRepository {

    static async getLikesOnPost(postId) {
        try {
            const postLikes = await likeModel.find({ postId: postId }).select({ userId: 1, _id: 0 });
            return postLikes;
        } catch (error) {
            throw error;
        }
    }

    static async toggleLike(userId, postId) {
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new ApplicationError("Post not found", 400);
            }
            const user = await userModel.findById(userId);
            if (!user) {
                throw new ApplicationError("User not found", 400);
            }
            let filter = {
                userId: userId,
                postId: postId
            }
            const likeStatus = await likeModel.findOne(filter);
            if (!likeStatus) {
                const like = new likeModel({
                    userId,
                    postId
                });
                await like.save();
                return "Post Liked";
            }
            await likeModel.findOneAndDelete(filter);
            return "Like removed from post";
        } catch (error) {
            throw error;
        }
    }

    
}