const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const validatePost = require('../middlewares/validatePost');

router.post('/', validatePost, postsController.createPost);
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.put('/:id', validatePost, postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;
