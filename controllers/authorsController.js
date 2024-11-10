const Author = require('../models/authorModel');

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: 'Error creating author', error });
  }
};

// Get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving authors', error });
  }
};

// Get all posts by author name
exports.getPostsByAuthor = (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./models/db.json', 'utf8'));
  const authorPosts = posts.filter(post => post.author === req.params.name);
  res.json(authorPosts);
};
