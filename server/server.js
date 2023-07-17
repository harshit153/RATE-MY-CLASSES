const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

JWT_SECRET = '6d37da89a4dfe504ef0eb143628acb70f6c9a6712fcc293eab1b264f05a8f816';

// Connect to MongoDB
mongoose.connect('mongodb+srv://harshitjain153:risq50OH7X53csBA@cluster0.1eoladw.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

//MODELS
const reviewSchema = new mongoose.Schema({
   userName: String,
    className: String,
    college: String,
    professor: String,
    termTaken: String,
    rating: Number,
    contents: String,
    reviewTitle: String,
    posttime: Date,
    likes: Array,
    likesCount: Number,
});

const Review = mongoose.model('Review', reviewSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

 
// Register a new user
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
});


// Protect the routes with authentication MIDDLEWARE
const authenticate = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(' ')[1];
    req.token = token
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

// Log in an existing user
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {expiresIn: '1200s'});
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});


// Review a class
app.post('/api/reviews', authenticate, async (req, res) => {
  jwt.verify(req.token, JWT_SECRET, async (err, data) => {
    if(err) {
      res.status(403).json({ result: 'Invalid token' });
    } else {
  try {
    const { userName, className, college, professor, termTaken, rating, contents, reviewTitle, likes, likesCount } = req.body;
    const posttime = new Date();
    const review = new Review({ userName, className, college, professor, termTaken, rating, contents, reviewTitle, posttime, likes, likesCount });
    await review.save();
    //await axios.post('/api/reviews', review);
    res.status(201).json({ message: 'Review created successfully.' });
  } catch (error) {
    console.error('Review creation error:', error);
    res.status(500).json({ error: 'An error occurred while creating the review.' });
  }
}
  })
});



// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'An error occurred while fetching reviews.' });
  }
});

// Get a single review by ID
app.get('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json(review);
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({ error: 'An error occurred while fetching the review.' });
  }
});

// Update a review by ID
app.put('/api/reviews/:id', authenticate, async (req, res) => {
  jwt.verify(req.token, JWT_SECRET, async (err, data) => {
    if(err) {
      res.status(403).json({ result: 'Invalid token' });
    } else {
  try {
    const { userName, className, college, professor, termTaken, rating, contents, reviewTitle, likes, likesCount } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { userName, className, college, professor, termTaken, rating, contents, reviewTitle, likes, likesCount });
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json({ message: 'Review updated successfully.' });
  } catch (error) {
    console.error('Review update error:', error);
    res.status(500).json({ error: 'An error occurred while updating the review.' });
  }
}})
});

// Delete a review by ID
app.delete('/api/reviews/:id', authenticate, async (req, res) => {
  jwt.verify(req.token, JWT_SECRET, async (err, data) => {
    if(err) {
      res.status(403).json({ result: 'Invalid token' });
    } else {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found.' });
    }
    res.json({ message: 'Review deleted successfully.' });
  } catch (error) {
    console.error('Review deletion error:', error);
    res.status(500).json({ error: 'An error occurred while deleting the review.' });
  }
}})
});

app.listen(4000, () => {
  console.log('Server started on port 4000');
});


