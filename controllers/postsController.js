const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '../models/db.json');

// Helper to read DB.json
const readDB = () => JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Helper to write to DB.json
const writeDB = (data) => fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

// Create a new post
exports.createPost = (req, res) => {
  const { title, content, author } = req.body;
  const posts = readDB();
  const newPost = { id: Date.now().toString(), title, content, author };
  posts.push(newPost);
  writeDB(posts);
  res.status(201).json(newPost);
};

// Read all posts
exports.getAllPosts = (req, res) => {
  const posts = readDB();
  res.json(posts);
};

// Read a specific post by ID
exports.getPostById = (req, res) => {
  const posts = readDB();
  const post = posts.find(p => p.id === req.params.id);
  post ? res.json(post) : res.status(404).json({ message: 'Post not found' });
};

// Update a post by ID
exports.updatePost = (req, res) => {
  const posts = readDB();
  const index = posts.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Post not found' });
  posts[index] = { ...posts[index], ...req.body };
  writeDB(posts);
  res.json(posts[index]);
};

// Delete a post by ID
exports.deletePost = (req, res) => {
  const posts = readDB();
  const newPosts = posts.filter(p => p.id !== req.params.id);
  writeDB(newPosts);
  res.status(200).json({ message: 'Post deleted successfully' });
};

