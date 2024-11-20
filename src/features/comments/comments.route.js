import express from 'express';
import { CommentsController } from './comments.controller.js';

const commentRouter = express.Router();
const commentsController = new CommentsController();

commentRouter.post('/:id', commentsController.createComment);
commentRouter.put('/:id', commentsController.updateComment);
commentRouter.delete('/:id', commentsController.deleteComment);
commentRouter.get('/:id', commentsController.getAllCommentsOnPost);

export default commentRouter;