import { ApplicationError } from "../../error-handler/applicationError.js";
import { PostsModel } from "../posts/posts.model.js";
import { UserModel } from "../user/user.model.js";

export class CommentsModel {
    constructor(id, userId, postId, content) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getAllCommentsOnPost(postId) {
        const post = PostsModel.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post not found", 400);
        }
        const Allcomments = comments.filter(comm => comm.postId == postId);
        if (Allcomments.length == 0) {
            throw new ApplicationError("No comments on post", 400);
        }
        const contentOnly = Allcomments.map(comm => comm.content);
        return contentOnly;
    };

    static createComment(userId, postId, content) {
        const user = UserModel.getUsers().find(user => user.id == userId);
        if (!user) {
            throw new ApplicationError("User not found", 400);
        }
        const post = PostsModel.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post not found", 400);
        }
        const comm = new CommentsModel(comments.length + 1, userId, postId, content);
        comments.push(comm);
        return comm;
    }

    static updateComment(userId, commentId, content) {
        const comm = comments.find(comm => comm.userId == userId && comm.id == commentId);
        if (!comm) {
            throw new ApplicationError("Comment not found", 400);
        }
        comm.content = content;
        return comm;
    }

    static deleteComment(userId, commentId) {
        const commindex = comments.findIndex(comm => comm.userId == userId && comm.id == commentId);
        if (commindex == -1) {
            throw new ApplicationError("Comment not found", 400);
        }
        comments.splice(commindex, 1);
        comments.forEach((comm, index) => comm.id = index + 1);
    }

}

var comments = [
    new CommentsModel(1, 1, 1, "Hi Nice pic"),
    new CommentsModel(2, 2, 2, "looking good"),
    new CommentsModel(3, 3, 2, "Wow"),
]