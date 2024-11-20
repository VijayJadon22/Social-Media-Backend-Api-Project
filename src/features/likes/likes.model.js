import { ApplicationError } from "../../error-handler/applicationError.js";
import { PostsModel } from "../posts/posts.model.js";
import { UserModel } from "../user/user.model.js";

export class LikesModel{
    constructor(id, userId, postId) {
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static getLikesOnPost(postId) {
        const post = PostsModel.getPostById(postId);
        if (!post) {
            throw new ApplicationError("Post does not exist",400);
        }
        const getLikedPost = likes.filter(like => like.postId == postId);
        if (getLikedPost.length==0) {
            return undefined;
        }
        const like = getLikedPost.map(likedPost => likedPost.userId);
        return like;
    }

    static toggleLike(userId, postId) {
        const post = PostsModel.getAllPosts().find(post => post.id == postId);
        if (!post) {
            throw new ApplicationError("Post does not exist",400);
        }
        const user = UserModel.getUsers().find(user => user.id == userId);
        if (!user) {
            throw new ApplicationError("User not found",400);
        }

        const likeIndex = likes.findIndex(like => like.userId == userId && like.postId == postId);
        let status;
        if (likeIndex == -1) {
            const like = new LikesModel(likes.length + 1, userId, postId);
            likes.push(like);
            status= "Post liked";
        } else {
            likes.splice(likeIndex, 1);
            likes.forEach((like, index) => like.id = index + 1);
            status= "Like removed";
        }
        return status;
    }

    static removeLike(userId, postId, likeId) {
        const post = likes.find(like => like.postId == postId && like.userId==userId && like.id==likeId);
        if (!post) {
            throw new ApplicationError("Post already not Liked",400);
        }
        const likeIndex = likes.findIndex(like => like.id == likeId);
        likes.splice(likeIndex, 1);
        likes.forEach((like, index) => like.id = index + 1);
    }
}

var likes = [
    new LikesModel(1,1,1),
    new LikesModel(2,2,2),
    new LikesModel(3,3,2),
]