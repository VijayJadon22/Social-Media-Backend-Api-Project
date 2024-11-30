import express from 'express';
import { CommentsController } from './comments.controller.js';

const commentRouter = express.Router();
const commentsController = new CommentsController();

commentRouter.post('/:postId', commentsController.createComment);
commentRouter.put('/:commentId', commentsController.updateComment);
commentRouter.delete('/:commentId', commentsController.deleteComment);
commentRouter.get('/:postId', commentsController.getAllCommentsOnPost);

export default commentRouter;