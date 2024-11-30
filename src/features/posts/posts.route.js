import express from 'express';
import { fileUpload } from '../../middlewares/fileUploadMiddleware.js';
import { PostsController } from './posts.controller.js';

const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.get('/postStatus/:postId', postsController.getPostStatus);
postsRouter.get('/all', postsController.getAllPosts);
postsRouter.get('/:postId', postsController.getPostById);
postsRouter.get('/', postsController.getUserPosts);
postsRouter.put('/:postId', fileUpload.single('postImage'), postsController.updatePost);

postsRouter.post('/', fileUpload.single('postImage'), postsController.createPost);
postsRouter.delete('/:postId', postsController.deletePost);

export default postsRouter;