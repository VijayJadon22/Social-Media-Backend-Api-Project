import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "posts"
    }
});

export const likeModel = mongoose.model('likes', likeSchema);