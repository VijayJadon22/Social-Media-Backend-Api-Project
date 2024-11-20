import { postModel } from "./posts.schema.js";


export class PostRepository{
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
            const posts = await postModel.find({}).select({ caption: 1, imageUrl: 1, _id:0 });
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
}