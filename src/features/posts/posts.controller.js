import { ApplicationError } from "../../error-handler/applicationError.js";
import { UserModel } from "../user/user.model.js";
import { PostsModel } from "./posts.model.js";
import { PostRepository } from "./posts.repository.js";


export class PostsController {

    async getAllPosts(req, res, next) {
        try {
            console.log("hello");
            const posts = await PostRepository.getAllPosts();
            if (!posts || posts.length==0) {
                return res.status(400).send("No posts!");
            }
            return res.status(200).send({ Posts: posts });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }


    async createPost(req, res, next) {
        try {
            const userId = req.userId;
            const caption = req.body.caption;
            if (!req.file) {
                throw new ApplicationError("No image uploaded", 400);
            }
            console.log(userId, caption);
            const filePath = '/uploadedFiles/' + req.file.filename;
            const postCreated = await PostRepository.createPost(userId, caption.trim(), filePath);
            if (!postCreated) {
                return res.status(400).send("Post not posted");
            }
            console.log(postCreated);
            return res.status(200).send({ Status: "Posted!", postCreated });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async getUserPosts(req, res, next) {
        try {
            const userId = req.userId;
            console.log(userId);
            const userPosts = await PostRepository.getUserPosts(userId);
            if (!userPosts || userPosts.length == 0) {
                return res.status(400).send("No posts by user");
            }
            return res.status(200).send({ Posts: userPosts });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async getPostById(req, res, next) {
        try {
            const postId = req.params.postId;
            const post = await PostRepository.getPostById(postId);
            if (!post) {
                return res.status(400).send("Post not found");
            }
            return res.status(200).send({ Post: post });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }

    }

    async updatePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const userId = req.userId;
            const caption = req.body.caption;

            const filePath = "uploadedFiles/" + req.file.filename;
            const post = await PostRepository.updatePost(postId, userId, caption, filePath);
            if (!post) {
                return res.status(400).send("Post is not created by the user");
            }
            return res.status(200).send({ status: "Post Updated successfully", Post: post });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async deletePost(req, res, next) {
        try {
            const postId = req.params.postId;
            const userId = req.userId;
            const deleteStatus = await PostRepository.deletePost(postId, userId);
            if (!deleteStatus) {
                return res.status(400).send("Only the user who created the post can delete it!");
            }
            console.log(deleteStatus);
            return res.status(200).send("Post deleted!");
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }

    }

    async getPostStatus(req, res, next) {
        try {
            const postId = req.params.postId;
            const postStats = await PostRepository.getPostStatus(postId);
            return res.status(200).send({ status: postStats });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    // draftPost(req, res, next) {
    //     try {
    //         const userId = req.userId;


    //     } catch (error) {
    //         console.error("Error: ", error);
    //         next(error);
    //     }
    // }
}

