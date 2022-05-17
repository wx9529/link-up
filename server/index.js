const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt')
require('dotenv').config()

const url = 'mongodb+srv://xinwang:QxMKRWywKMtPyqrr@cluster0.krnu1.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json('Hello to my app');
})

app.post('/signup', async (req, res) => {
  const client = new MongoClient(url);
  const { email, password } = req.body;

  const generateduserId = uuidv4();
  const hashedpassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users')

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }
    const sanitizedEamil = email.toLowerCase();

    const data = {
      user_id: generateduserId,
      email: sanitizedEamil,
      hashed_password: hashedpassword
    }
    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEamil, { expiresIn: 60 * 60 })
    res.status(201).json({ token, userId: generateduserId, email: sanitizedEamil });

  } catch (err) {
    console.log(err);
  }
})

app.post('/login', async (req, res) => {
  const client = new MongoClient(url);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const user = await users.findOne({ email });

    const correctPassword = await bcrype.compare(password, user.hashed_password);

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 60
      })
      res.status(201).json({ token, userId: user.user_id, email });
    }
    res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const returnedUsers = await users.find().toArray();
    res.send(returnedUsers);
  } finally {
    await client.close();
  }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT));

