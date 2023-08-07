const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
const uri = 'mongodb+srv://massdriver64:4deMi0rcvl2tdSPr@cluster0.8bs3d0v.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Define the Mongoose schema and model
const userDataSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  meetingName: String,

  meetingData: Object,
});

const userDataModel = mongoose.model('UserData', userDataSchema);

app.post('/getsignupdetails', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userDataModel.findOne({ email });
    if (user) {
      console.log("User already exists");
      res.status(401).json({ message: "User already exists" });
    } else {
      const newSignupData = new userDataModel(req.body);
      await newSignupData.save();
      res.json('Sign Up Data Added!');
    }
  } catch (err) {
    console.error('Error adding signup data:', err);
    res.status(400).json('Error adding signup data');
  }
});

app.post('/getlogindetails', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userDataModel.findOne({ email, password });
    if (user) {
      console.log("User exists!");
      res.status(200).json({ message: "Login successful!", name: user.name });
    } else {
      console.log("User does not exist!");
      res.status(401).json({ message: "Invalid credentials!" });
    }
  } catch (err) {
    console.error('Error occurred during login:', err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/updateParticipantName', async (req, res) => {
  const { participantNames, name } = req.body;
  try {
    const user = await userDataModel.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.participantNames.push(participantNames);
    await user.save();
    res.status(200).json({ message: 'Participant name added successfully', user });
  } catch (error) {
    console.error('Error occurred while updating participant name:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/names', async (req, res) => {
  try {
    const names = await userDataModel.find({}, 'name');
    res.json(names);
  } catch (error) {
    console.error('Error fetching names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// app.post('/api/addMeeting', async (req, res) => {
//   console.log(req.body)
//   req.body
// });

app.post('/api/addMeeting', async (req, res) => {
  try {
    const { name, email, password, meetingName, meetingDate, participants } = req.body;

    // Create a new meeting object as a JSON object
    const newMeeting = {
      meetingName,
      userName: name, // Assuming the user's name is relevant for the meeting
      meetingDate,
      participants,
    };

    // Find the user document based on email (assuming email is unique)
    const user = await userDataModel.findOne({ email });

    // If the user exists, add the meeting data directly to their meetingData field
    if (user) {
      user.meetingData = newMeeting;
      await user.save();
    } else {
      // If the user does not exist, create a new user document with the meetingData field
      const newUser = new userDataModel({
        name,
        email,
        password,
        meetingData: newMeeting,
      });
      await newUser.save();
    }

    // You can optionally send a response back to the client
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error('Error saving meeting data:', error);
    res.status(500).json({ error: 'Error saving meeting data.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
