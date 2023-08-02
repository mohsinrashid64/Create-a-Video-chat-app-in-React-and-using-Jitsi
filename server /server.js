// const express = require('express');
// const bodyParser = require('body-parser');
// const app = express();
// const PORT = 5000;

// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));



// // Get POST Data
// app.post('/api/post-token-data',(req,res)=>{
//   console.log(req.body.message)
// })

// // Set Number of Participants
// let numberOfParticipants = 0
// app.post('/api/set-number-of-participants', (req, res) => {
//   console.log("NUMBER OF PARTICIPANTS",req.body.num)
//   numberOfParticipants = req.body.num
// });

// // Set Number of Participants After Participant Left
// app.post('/api/decrease-number-of-participants', (req, res) => {
//   numberOfParticipants = req.body.num
//   console.log("NUMBER OF PARTICIPANTS AFTER LEAVING ELCTRIC",numberOfParticipants)
// });


// // Send Number of Participatns
// app.get('/api/send-number-of-participants',(req,res) => {
//   res.json({num: numberOfParticipants})
// })


// // Listening on PORT mof
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




//// TESTING SERVER MONGO STUFF

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000

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

// Define the Todo schema
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// API routes
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.log(err);
    res.status(500).json('Error fetching todos');
  }
});

app.post('/todos/add', async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    completed: false,
  });

  try {
    await newTodo.save();
    res.json('Todo added!');
  } catch (err) {
    console.log(err);
    res.status(400).json('Error adding todo');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
