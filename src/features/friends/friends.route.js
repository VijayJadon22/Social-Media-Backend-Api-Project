import express from "express";
import { FriendsController } from "./friends.controller.js";

const friendsRouter = express.Router();

const friendsController = new FriendsController();

friendsRouter.post('/:id', friendsController.sendRequest);
friendsRouter.get('/requests', friendsController.getUserRequests);
friendsRouter.get('/friends', friendsController.getUserFriends);
friendsRouter.get('/accept/:id', friendsController.acceptRequest);
friendsRouter.get('/reject/:id', friendsController.rejectRequest);
friendsRouter.get('/unfriend/:id', friendsController.removeFriend);

export default friendsRouter;