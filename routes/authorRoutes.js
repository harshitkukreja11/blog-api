const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authorsController');

router.post('/', authorsController.createAuthor);
router.get('/', authorsController.getAllAuthors);
router.get('/:name/posts', authorsController.getPostsByAuthor);

module.exports = router;
