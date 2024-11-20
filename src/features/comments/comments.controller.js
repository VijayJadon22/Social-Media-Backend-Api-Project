import { ApplicationError } from "../../error-handler/applicationError.js";
import { CommentsModel } from "./comments.model.js"
export class CommentsController {

    getAllCommentsOnPost(req, res, next) {
        try {
            const postId = req.params.id;
            const comments = CommentsModel.getAllCommentsOnPost(postId);
            return res.status(200).send({ comments: comments });
        } catch (error) {
            next(error);
        }
    }

    createComment(req, res, next) {
        try {
            const userId = req.userId;
            const postId = req.params.id;
            const content = req.body.content;
            console.log(postId);
            if (!content || content.trim() == "") {
                throw new ApplicationError("Comment not found", 400);
            }
            const comment = CommentsModel.createComment(userId, postId, content);
            return res.status(201).send({ Status: "Comment Posted!", Comment: comment });
        } catch (error) {
            next(error);
        }

    }

    updateComment(req, res, next) {
        try {
            const userId = req.userId;
            const commentId = req.params.id;
            const content = req.body.content;
            if (!content || content.trim() == "") {
                return res.status(400).send("Content is required.");
            }
            const comment = CommentsModel.updateComment(userId, commentId, content);
            return res.status(201).send({ Status: "Comment Updated", Comment: comment });
        } catch (error) {
            next(error);
        }
    }

    deleteComment(req, res, next) {
        try {
            const userId = req.userId;
            const commentId = req.params.id;
            CommentsModel.deleteComment(userId, commentId);
            return res.status(200).send("Comment Deleted!");
        } catch (error) {
            next(error);
        }
    }
}



