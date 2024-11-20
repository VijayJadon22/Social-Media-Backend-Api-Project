import { ApplicationError } from "../../error-handler/applicationError.js";

export class PostsModel {
    constructor(id, userId, caption, imageUrl) {
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static getAllPosts() {
        if (posts.length == 0) {
            return undefined;
        }
        return posts;
    }

    static createPost(userId, caption, filePath) {
        const post = new PostsModel(posts.length + 1, userId, caption, filePath);
        posts.push(post);
        return post;
    }

    static getUserPosts(id) {
        const userPosts = posts.filter(post => post.userId == id);
        if (userPosts.length == 0) {
            throw new ApplicationError("No posts found", 400);
        }
        return userPosts;
    }

    static getPostById(id) {
        const post = posts.find(post => post.id == id);
        return post;
    }

    static updatePost(postId, userId, caption, filePath) {
        const postIndex = posts.findIndex(post => post.id == postId && post.userId == userId);
        if (postIndex == -1) {
            throw new ApplicationError("Post not found", 400);
        }
        const post = new PostsModel(postId, userId, caption, filePath);
        posts[postIndex] = post;
        return post;
    }

    static deletePost(id,userId) {
        const postIndex = posts.findIndex(post => post.id == id && post.userId==userId);
        if (postIndex == -1) {
            throw new ApplicationError("Post not found or does not exist to user", 400);
        }
        posts.splice(postIndex, 1);
        posts.forEach((post, index) => post.id = index + 1);
    }

    // static draftPost() {
        
    // }
}

var posts = [
    new PostsModel(1, 1, "This is my first post", "sacdsvfbmkgbmkgmb"),
    new PostsModel(2, 2, "Hello everyone", "sacdsfbdvfbmkgbmkgmb"),
    new PostsModel(3, 3, "This is my second post", "sacdsfbdvfbmkgbmkgmb"),
    new PostsModel(4, 1, "This is my second post", "sacdsfbdvfbmkgbmkgmb"),
]