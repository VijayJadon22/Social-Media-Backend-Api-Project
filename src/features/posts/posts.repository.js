import { commentModel } from "../comments/comments.schema.js";
import { likeModel } from "../likes/likes.schema.js";
import { postModel } from "./posts.schema.js";


export class PostRepository {
    static async createPost(userId, caption, filePath) {
        try {
            /* used create method here to create a document and save it as we dont havr to perform and pre save hook here like before saving user we have used a prehook where we are hashing the password before saving */
            const post = await postModel.create({
                userId,
                caption,
                imageUrl: filePath
            });
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
            console.log("hello");
            const posts = await postModel.find({}).select({ caption: 1, imageUrl: 1, _id: 0 });
            console.log(posts);
            return posts;
        } catch (error) {
            throw error;
        }
    }

    static async getUserPosts(userId) {
        try {
            const userPosts = await postModel.find({ userId: userId }).select({ caption: 1, imageUrl: 1, _id: 0 });
            return userPosts;
        } catch (error) {
            throw error;
        }
    }

    static async getPostById(postId) {
        try {
            return await postModel.findById(postId).select({ caption: 1, imageUrl: 1, _id: 0 });
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