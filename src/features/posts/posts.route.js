import express from 'express';
import { fileUpload } from '../../middlewares/fileUploadMiddleware.js';
import { PostsController } from './posts.controller.js';

const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.get('/all', postsController.getAllPosts);
postsRouter.get('/:id', postsController.getPostById);
postsRouter.get('/', postsController.getUserPosts);
postsRouter.put('/:id', fileUpload.single('postImage'), postsController.updatePost);

postsRouter.post('/', fileUpload.single('postImage'), postsController.createPost);
// postsRouter.post('/draft', fileUpload.single('postImage'), postsController.createPost);
postsRouter.delete('/:id', postsController.deletePost);

export default postsRouter;