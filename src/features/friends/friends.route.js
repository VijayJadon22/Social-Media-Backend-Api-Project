import express from "express";
import { FriendsController } from "./friends.controller.js";

const friendsRouter = express.Router();

const friendsController = new FriendsController();

friendsRouter.get('/get-pending-requests', friendsController.getUserRequests);
friendsRouter.get('/get-friends', friendsController.getUserFriends);
friendsRouter.get("/toggle-friendship/:friendId", friendsController.toggleFriendship);
friendsRouter.get("/response-to-request/:friendId", friendsController.respondToRequest);

export default friendsRouter;