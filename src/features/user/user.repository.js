import mongoose from "mongoose";
import { userModel } from "./user.Schema.js";
import { friendsModel } from "../friends/friends.schema.js";

export class UserRepository {
    static async createUser(name, email, password, gender) {
        try {
            const user = new userModel({
                name,
                email,
                password,
                gender
            });
            /* hashing of password is handled in pre 'save' hook of userSchema
             so before saving password will be hashed also the validator function of 
             userSchema will work while we create the userModel 
             instance using userSchema and as passeword is getting hashed 
             just before saving validator is gonna work on the actual 
             password entered by the user */
            await user.save();

            // creating the friends document for the user 
            const friendsDocument = new friendsModel({
                name: name,
                userId: user._id
            });
            await friendsDocument.save();

            return {
                name: user.name,
                email: user.email
            };
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            return await userModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            // Find all users and select only name and email fields, excluding _id
            return await userModel.find({}).select({ name: 1, email: 1, _id: 0 });
        } catch (error) {
            // Throw any error that occurs
            throw error;
        }
    }

    static async getUserDetailsById(userId) {
        try {
            // Find the user by ID
            const user = await userModel.findById(userId).select({ password: 0, _id: 0, __v: 0 }); // Exclude password and _id field for security

            // If user is not found, return undefined
            if (!user) {
                return undefined;
            }

            // Return the user details
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async updateUserDetails(name, email, userId) {
        try {
            // Using findByIdAndUpdate with the option to return the updated document
            const userDocument = await userModel.findByIdAndUpdate(
                userId,
                { name, email },
                { new: true, runValidators: true } // Return the updated document and run validators
            ).select('name email -_id');

            // If user is not found, return undefined
            if (!userDocument) {
                return undefined;
            }

            // Return the updated user details
            return userDocument;
        } catch (error) {
            throw error;
        }
    }

    static async logout(token, userId) {
        try {
            const result = await userModel.findOneAndUpdate(
                { _id: userId },
                { $pull: { tokens: token } },
                { new: true } // Return the updated document
            );
            return !!result; // Returns true if a document was found and updated, otherwise false
            /* result will be null or undefined if no document was found.
                result will be the updated document if the update operation succeeded.
                By using !!result, you convert:
                A truthy value (the updated document) to true.
                A falsy value (null or undefined) to false. */
        } catch (error) {
            throw error;
        }
    }

    static async logoutAll(userId, token) {
        try {
            const userDocument = await userModel.findOneAndUpdate(
                { _id: userId },
                { $set: { tokens: [] } },
                { new: true },
            );
            return !!userDocument;
        } catch (error) {
            throw error;
        }
    }


}
