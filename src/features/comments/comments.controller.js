import { ApplicationError } from "../../error-handler/applicationError.js";
import { CommentsModel } from "./comments.model.js"
import { CommentRepository } from "./comments.repository.js";
export class CommentsController {

    async getAllCommentsOnPost(req, res, next) {
        try {
            const postId = req.params.postId;
            const comments = await CommentRepository.getAllCommentsOnPost(postId);
            if (!comments) {
                return res.status(400).send("No comments on post");
            }
            return res.status(200).send({ comments: comments });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async createComment(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.postId;
            const content = req.body.content;
            console.log(userId, postId, content);
            if (!content || content.trim() == "") {
                throw new ApplicationError("Content not found", 400);
            }
            const comment = await CommentRepository.createComment(userId, postId, content);
            return res.status(201).send({ Status: "Comment Posted!", Comment: comment });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async updateComment(req, res, next) {
        try {
            const userId = req.userId;
            const commentId = req.params.commentId;
            const content = req.body.content;
            if (!content || content.trim() == "") {
                return res.status(400).send("Content is required.");
            }
            const comment = await CommentRepository.updateComment(userId, commentId, content);
            return res.status(201).send({ Status: "Comment Updated", Comment: comment });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async deleteComment(req, res, next) {
        try {
            const userId = req.userId;
            const commentId = req.params.commentId;
            const deletedComment = await CommentRepository.deleteComment(userId, commentId);
            if (!deletedComment) {
                throw new ApplicationError("Comment not found or user not authorized to delete this comment", 404);
            }
            return res.status(200).send({ message: "Comment successfully deleted!" });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }
}



