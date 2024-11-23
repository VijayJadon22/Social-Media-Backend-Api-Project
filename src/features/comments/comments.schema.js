import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "posts"
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    createdAt: {
        type: Date,
        default: Date.now //Automatically sets the creation date
    },
    updatedAt: {
        type: Date,
        default: Date.now //Automatically sets the update date
    }
}, { timestamps: true });

export const commentModel = mongoose.model("comments", commentSchema);