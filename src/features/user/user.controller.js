
import jwt from 'jsonwebtoken';
import { UserRepository } from "./user.repository.js";

import bcrypt from "bcrypt";
const saltRounds = 12; /*number should be between 10-20, bigger the number the more complex password and will take more time to hash it*/

export class UserController {

    async getAllUsers(req, res, next) {
        try {
            // const users = UserModel.getUsers();
            const users = await UserRepository.getAllUsers();
            console.log(users);
            return res.status(200).send({ Users: users });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }

    async signup(req, res, next) {
        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            // const hashedPassword = await bcrypt.hash(password, saltRounds);
            // hashing of password is handled in pre 'save' hook of userSchema
            const user = await UserRepository.createUser(name, email, password);
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
            return res.status(200).send({ status: "Login Successfull", token: token });
        } catch (error) {
            console.error("Error: ", error);
            next(error);
        }
    }
}