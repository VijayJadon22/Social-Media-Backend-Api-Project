import { commentModel } from "../comments/comments.schema.js";
import { likeModel } from "../likes/likes.schema.js";
import { postModel } from "./posts.schema.js";


export class PostRepository {
    static async createPost(userId, caption, filePath) {
        try {
            const post = new postModel({
                userId,
                caption,
                imageUrl: filePath
            });
            await post.save();
            return {
                caption: post.caption,
                image: post.imageUrl
            };
        } catch (error) {
            throw error;
        }
    }

    static async getAllPosts() {
        try {
            const posts = await postModel.find({}).select({ caption: 1, imageUrl: 1, _id: 0 });
            return posts;
        } catch (error) {
            throw error;
        }
    }

    static async getUserPosts(id) {
        try {
            const userPosts = await postModel.find({ userId: id }).select({ caption: 1, imageUrl: 1, _id: 0 });
            return userPosts;
        } catch (error) {
            throw error;
        }
    }

    static async getPostById(id) {
        try {
            return await postModel.findById(id).select({ caption: 1, imageUrl: 1, _id: 0 });
        } catch (error) {
            throw error;
        }
    }

    static async updatePost(postId, userId, caption, filePath) {
        try {
            const filter = {
                _id: postId,
                userId: userId
            }
            const update = {
                caption: caption.trim(),
                imageUrl: filePath
            };
            const options = { new: true };

            const updatedPost = await postModel.findOneAndUpdate(filter, update, options).select({ caption: 1, imageUrl: 1, _id: 0 });
            return updatedPost;
        } catch (error) {
            throw error;
        }
    }

    static async deletePost(postId, userId) {
        try {
            const filter = {
                _id: postId,
                userId: userId
            }
            const deleteStatus = await postModel.findOneAndDelete(filter);
            return deleteStatus;
        } catch (error) {
            throw error;
        }
    }

    static async getPostStatus(postId) {
        try {
            const totalLikes = await likeModel.countDocuments({ postId });
            const totalComments = await commentModel.countDocuments({ postId });
            return {
                Likes: totalLikes,
                Comments: totalComments
            };
        } catch (error) {
            throw error;
        }
    }
}