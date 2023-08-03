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
const signUpSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const SignUpModel = mongoose.model('SignUp', signUpSchema);

app.post('/getsignupdetails', async (req, res) => {
    const { email } = req.body; // Ensure the 'password' field is in the request body
  console.log("YO",req.body['name'])
  console.log("YOoooooooo",typeof(req.body['name']))

  const _user = await SignUpModel.findOne( {email} ); // Find the user by both email and password
  console.log("USER", _user);
  if (_user) {
    console.log("USER ALREADY EXISTS")
    // res.status(401).json({ message: "User already exists" });
  }
  else{
    const newSignupData = new SignUpModel({
        name:req.body['name'],
        email:req.body['email'],
        password:req.body['password'],
      });
    
      try {
        await newSignupData.save();
        res.json('Sign Up Data Added!');
      } catch (err) {
        console.log(err);
        res.status(400).json('Error adding todo');
      }
  }
  
});

app.post('/getlogindetails', async (req, res) => {
    const { email, password } = req.body; // Ensure the 'password' field is in the request body
    try {
        const user = await SignUpModel.findOne({ email, password }); // Find the user by both email and password
        if (user) {
            console.log("User exists!");
            // Do something if the user exists
            // For example, you can send a success response back to the client
            res.status(200).json({ message: "Login successful!" });
        } else {
            console.log("User does not exist!");
            // Do something if the user does not exist
            // For example, you can send a failure response back to the client
            res.status(401).json({ message: "Invalid credentials!" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get('/sendlogindetails',async(req,res)=>{

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
