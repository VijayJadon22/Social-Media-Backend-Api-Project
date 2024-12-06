
import jwt from 'jsonwebtoken';
import { UserRepository } from "./user.repository.js";

import bcrypt from "bcrypt";
const saltRounds = 12; /*number should be between 10-20, bigger the number the more complex password and will take more time to hash it*/

export class UserController {

    async getAllUsers(req, res, next) {
        try {
            const users = await UserRepository.getAllUsers();
            return res.status(200).send({ Users: users });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async getUserDetailsById(req, res, next) {
        try {
            const userId = req.params.userId;
            const user = await UserRepository.getUserDetailsById(userId);
            if (!user) {
                return res.status(400).send("User not found");
            }
            return res.status(200).send({ User: user });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async signup(req, res, next) {
        try {
            console.log(req.body);
            const { name, email, password, gender } = req.body;

            // hashing of password is handled in pre 'save' hook of userSchema
            const user = await UserRepository.createUser(name, email, password, gender);
            if (!user) {
                return res.status(400).send("User not created!");
            }
            return res.status(200).send({ status: "User Registered Succesfully", User: user });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }

    }

    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            // const userSigned = UserModel.loginUser(email, password);
            const userRegistered = await UserRepository.findByEmail(email);
            if (!userRegistered) {
                return res.status(400).send("Invalid Creds");
            }
            // If passwords do not match, return an error
            const isPasswordMatch = await bcrypt.compare(password, userRegistered.password);
            if (!isPasswordMatch) {
                return res.status(400).send("Invalid Creds");
            }

            // Create JWT payload as password matched
            const payload = {
                userId: userRegistered._id,
                userEmail: userRegistered.email
            }
            const secretKey = process.env.JWT_SECRET_KEY;
            const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

            // insert the token into tokens field of userDocument for logout functionality
            userRegistered.tokens.push(token);
            await userRegistered.save({ validateBeforeSave: false });

            return res.status(200).send({ status: "Login Successfull", token: token });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async updateUserDetails(req, res, next) {
        try {
            const userId = req.params.userId;
            const { name, email } = req.body;
            const updatedUserDetails = await UserRepository.updateUserDetails(name, email, userId);
            if (!updatedUserDetails) {
                return res.status(400).send("User details not updated");
            }
            return res.status(200).send({ status: "User details updated", user: updatedUserDetails });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const token = req.headers["authorization"];
            const userId = req.userId;
            if (!token) {
                return res.status(400).send("Unauthorized, token expected");
            }

            const logoutStatus = await UserRepository.logout(token, userId);

            if (logoutStatus) {
                return res.status(200).send("Logged out successfully");
            } else {
                return res.status(400).send("Logout failed");
            }
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async logoutAll(req, res, next) {
        try {
            const userId = req.userId;
            const token = req.headers["authorization"];
            const logoutAllStatus = await UserRepository.logoutAll(userId, token);
            if (logoutAllStatus) {
                return res.status(200).send("Logged out of all devices successfully");
            }
            return res.status(400).send("Logout failed");
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }
}