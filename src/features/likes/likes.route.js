import express from 'express';
import { LikesController } from './likes.controller.js';

const likeRouter = express.Router();
const likesController = new LikesController();

likeRouter.get('/toggle/:postId', likesController.toggleLike);
likeRouter.get('/:postId', likesController.getLikesOnPost);

export default likeRouter;