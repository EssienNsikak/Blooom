const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const users = require('./rotues/users');
const comments = require('./rotues/comments');
const auth = require('./rotues/auth');
const posts = require('./rotues/posts');
const conversations = require('./rotues/conversations');
const messages = require('./rotues/messages');
const multer = require('multer');
const path = require('path');

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Uploading Image file using Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded successfully.');
  } catch (err) {
    console.log(err);
  }
})

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/comments', comments);
app.use('/api/conversations', conversations);
app.use('/api/messages', messages);



PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Connected to ${process.env.MONGO_URL} on port ${PORT}`)
});