import express from 'express';

import { UserController } from './user.controller.js';

const userController = new UserController();

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);

export default userRouter;