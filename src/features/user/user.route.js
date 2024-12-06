import express from 'express';

import { UserController } from './user.controller.js';
import { jwtAuth } from '../../middlewares/jwt.middleware.js';

const userController = new UserController();

const userRouter = express.Router();

userRouter.get('/get-details/:userId', userController.getUserDetailsById);
userRouter.get('/get-all-details', userController.getAllUsers);
userRouter.post('/signup', userController.signup);
userRouter.post('/signin', userController.signin);
userRouter.post('/update-details/:userId', userController.updateUserDetails);
userRouter.get("/logout-all-devices", jwtAuth, userController.logoutAll);
userRouter.get("/logout", jwtAuth, userController.logout);

export default userRouter;