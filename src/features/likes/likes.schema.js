import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    // Reference to the user who liked the post or comment
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    // Reference to the liked post (optional, only one of postId or commentId should be provided)
    postId: {
        type: Schema.Types.ObjectId,
        ref: "posts"
    },
    // Reference to the liked comment (optional, only one of postId or commentId should be provided)
    commentId: {
        type: Schema.Types.ObjectId,
        ref: "comments"
    }
}, {
    // Custom validator to ensure that either postId or commentId is provided, but not both
    validate: {
        validator: function () {
            return (this.postId && !this.commentId) || (!this.postId && this.commentId);
        },
        message: "Either postId or commentId must be provided, but not both."
    },
    // Automatically add createdAt and updatedAt fields
    timestamps: true
});

// Create the Mongoose model for likes
export const likeModel = mongoose.model('likes', likeSchema);
