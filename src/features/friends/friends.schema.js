import mongoose, { Schema } from "mongoose";

const friendsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    requests: [
        {
            type: Schema.Types.ObjectId,
            ref: "users"
        }
    ]
}, { timestamps: true });

export const friendsModel = mongoose.model("friends", friendsSchema);