import mongoose, { Schema } from "mongoose";

export const postSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    caption: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
        trim: true,
    }
}, { timestamps: true });

export const postModel = mongoose.model('posts', postSchema);