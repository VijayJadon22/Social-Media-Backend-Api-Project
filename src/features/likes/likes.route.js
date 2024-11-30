import express from 'express';
import { LikesController } from './likes.controller.js';

const likeRouter = express.Router();
const likesController = new LikesController();

likeRouter.get('/toggle/:id', likesController.toggleLikeOnPostOrComment);
likeRouter.get('/:id', likesController.getLikesOnPostOrComment);


export default likeRouter;