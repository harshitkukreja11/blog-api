const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/blogPlatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

app.use(express.json());


const postRoutes = require('./routes/postRoutes');
const authorRoutes = require('./routes/authorRoutes');

app.use('/posts', postRoutes);
app.use('/authors', authorRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Blogging Platform API');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

app.use(logger);
app.use(errorHandler);
