const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todos');
const app = express();
app.use(cors());
app.use(express.json());
const mongoURI = 'mongodb+srv://kmass8754:karthick877@karthicktask.bbjj1ye.mongodb.net/Todolist';

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

const db = mongoose.connection;
 app.get('/get' , (req,res)=>{
 TodoModel.find()
 .then(result => res.json(result))
 .catch(err => res.json(err))

 })
 app.put('/update/:id' , (req,res)=>{
    const {id}= req.params;
    TodoModel.findByIdAndUpdate({_id: id},{done:true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
   
    })
    app.delete('/delete/:id' , (req,res)=>{
        const {id}= req.params;
        TodoModel.findByIdAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => res.json(err))
       
        })

app.post('/add', (req, res) => {
  const task = req.body.task;

  // Create a new task in the database
  TodoModel.create({
    task: task,
  })
    .then((result) => {
      console.log('Task added successfully:', result);
      res.json(result); // Send the result as JSON response
    })
    .catch((err) => {
      console.error('Error adding task to the database:', err);
      res.status(500).json({ error: 'Internal Server Error' }); // Send an error response
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
