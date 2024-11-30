import express from 'express';

import { UserController } from './user.controller.js';

const userController = new UserController();

const userRouter = express.Router();

userRouter.get('/get-details/:userId', userController.getUserDetailsById);
userRouter.get('/get-all-details', userController.getAllUsers);
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);
userRouter.post('/update-details/:userId', userController.updateUserDetails);

export default userRouter;