import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
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
        required: true
    }
}, { timestamps: true });

export const postModel = mongoose.model('posts', postSchema);