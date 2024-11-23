import mongoose from "mongoose";
import { postModel } from "../posts/posts.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { userModel } from "../user/user.Schema.js";
import { commentModel } from "./comments.schema.js";

export class CommentRepository {

    static async createComment(userId, postId, content) {
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                throw new ApplicationError("Post not found", 400);
            }
            const user = await userModel.findById(userId);
            if (!user) {
                throw new ApplicationError("User not found", 400);
            }
            const comment = new commentModel({ userId, postId, content });
            await comment.save();
            return {
                content: comment.content
            };
        } catch (error) {
            throw error;
        }
    }

    static async getAllCommentsOnPost(postId) {
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                // If post does not exist, delete all comments related to the post
                await commentModel.deleteMany({ postId });
                throw new ApplicationError("Post not found", 400);
            }
            const comments = await commentModel.find({ postId }).select({ content: 1, _id: 0 });
            return comments;
        } catch (error) {
            throw error;
        }
    }

    static async updateComment(userId, commentId, content) {
        try {
            const comment = await commentModel.findById(commentId);
            // check is comment exist
            if (!comment) {
                throw new ApplicationError("Comment not found", 404);
            }
            // Check if the user is authorized to update the comment 
            if (comment.userId.toString() !== userId) {
                throw new ApplicationError("User not authorized to update this comment", 403);
            }
            comment.content = content;
            await comment.save();
            return {
                content: comment.content
            };
        } catch (error) {
            throw error;
        }
    }

    static async deleteComment(userId, commentId) {
        try {
            const filter = {
                _id: commentId,
                userId: userId,
            }
            // Find and delete the comment based on the filter
            return await commentModel.findOneAndDelete(filter);
        } catch (error) {
            throw error;
        }
    }

}