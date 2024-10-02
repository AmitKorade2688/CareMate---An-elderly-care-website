const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(cors()); // Enable CORS to handle requests from the React frontend
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to MongoDB (replace with your MongoDB connection string)
mongoose.connect('mongodb://127.0.0.1:27017/demo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Create User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: String,
});

const User = mongoose.model('User', userSchema);

// Route to handle user signup
app.post('/signup', async (req, res) => {
  const { username, password, confirmPassword, phoneNumber } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      phoneNumber,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error); // Log the error
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Route to handle user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Login successful, send a message
    res.status(200).json({ message: 'Login successful', username: user.username });
  } catch (error) {
    console.error('Error logging in:', error); // Log the error
    res.status(500).json({ message: 'Error logging in' });
  }
});

// NEW CODE BELOW

// Create Applicant Schema for form data
const applicantSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: { type: String },
  surname: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  referralCode: { type: String },
});

const Applicant = mongoose.model('Applicant', applicantSchema);

// Route to handle applicant form submission
app.post('/apply', async (req, res) => {
  const { firstName, middleName, surname, dateOfBirth, gender, email, phoneNumber, address, referralCode } = req.body;

  try {
    // Check if an applicant with the same email already exists
    const existingApplicant = await Applicant.findOne({ email });
    if (existingApplicant) {
      return res.status(400).json({ message: 'An applicant with this email already exists' });
    }

    // Create a new applicant
    const newApplicant = new Applicant({
      firstName,
      middleName,
      surname,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
      address,
      referralCode,
    });

    // Save the applicant to the database
    await newApplicant.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error); // Log the error
    res.status(500).json({ message: 'Error submitting application' });
  }
});

// Start the server on a specified port
const PORT = 8080; // Use port 8080 for consistency with client
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
