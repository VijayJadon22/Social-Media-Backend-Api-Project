import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';

import userRouter from './src/features/user/user.route.js';
import postsRouter from './src/features/posts/posts.route.js';
import commentRouter from './src/features/comments/comments.route.js';
import likeRouter from './src/features/likes/likes.route.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import { jwtAuth } from './src/middlewares/jwt.middleware.js';
import { logger } from './src/middlewares/logger.middleware.js';
import { connectWithMongoDb } from './src/config/mongooseConfig.js';
import friendsRouter from "./src/features/friends/friends.route.js";


const PORT = 7500;
const server = express();

server.use(bodyParser.json());

server.use('/api/users', userRouter);
server.use('/api/posts', logger, jwtAuth, postsRouter);
server.use('/api/comments', logger, jwtAuth, commentRouter);
server.use('/api/likes', logger, jwtAuth, likeRouter);
server.use('/api/friends', logger, jwtAuth, friendsRouter);

server.use((err, req, res, next) => {
    if (err instanceof ApplicationError) {
        return res.status(err.statusCode).send(err.message);
    }
    res.status(500).send("Something went wrong, Please try again!");
});

server.use((req, res) => {
    res.status(400).send("API not found, Please check the API");
})

server.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
    connectWithMongoDb();
});

