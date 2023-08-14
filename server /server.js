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
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  meetingName: String,

  meetingData: [Object],
});

const userDataModel = mongoose.model('UserData', userDataSchema);

app.post('/api/postsignupdetails', async (req, res) => {
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

app.post('/api/postlogindetails', async (req, res) => {
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


app.post('/api/addMeeting', async (req, res) => {
  try {
    const { name, email, password, meetingName, meetingDate, participants } = req.body;

    // Create a new meeting object
    const newMeeting = {
      meetingName,
      userName: name,
      meetingDate,
      participants,
    };

    // Loop through the participants array and update meetingData for each participant
    for (let i = 0; i < participants.length; i++) {
      const participantName = participants[i];
      let user = await userDataModel.findOne({ name: participantName });
      if (user) {
        user.meetingData.push(newMeeting);
        await user.save(); // Save the updated user document
      } 
      await user.save(); // Save the new user document
  
    }

    // You can optionally send a response back to the client
    res.status(201).json(newMeeting);
  } catch (error) {
    console.error('Error saving meeting data:', error);
    res.status(500).json({ error: 'Error saving meeting data.' });
  }
});


app.get('/api/meetingData', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await userDataModel.findOne({ email });

    if (!user) {
      // If the user does not exist or has no meeting data, send an empty array as the response
      return res.json([]);
    }

    // Send the meetingData array as the response
    res.json(user.meetingData || []);
  } catch (error) {
    console.error('Error fetching meeting data:', error);
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
