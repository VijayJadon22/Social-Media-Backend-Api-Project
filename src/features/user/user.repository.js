import mongoose from "mongoose";
import { userSchema } from "./user.Schema.js";

const userModel = mongoose.model("users", userSchema);

export class UserRepository {
    static async createUser(name, email, password) {
        try {
            const user = new userModel({
                name,
                email,
                password
            });
            /* hashing of password is handled in pre 'save' hook of userSchema
             so before saving password will be hashed also the validator function of 
             userSchema will work while we create the userModel 
             instance using userSchema and as passeword is getting hashed 
             just before saving validator is gonna work on the actual 
             password entered by the user */
            await user.save();
            return {
                name: user.name,
                email:user.email
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
            return await userModel.find({}).select({ name: 1, email: 1, _id: 0 });
        } catch (error) {
            throw error;
        }
    }
}