const PORT = process.env.PORT || 8000;
const host = '0.0.0.0';
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const url = process.env.URL;

const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, host, () => console.log('Server running on PORT ' + PORT));

app.get('/', (req, res) => {
  res.json('Hello to my app');
})

app.post('/signup', async (req, res) => {
  const client = new MongoClient(url);
  const { email, password, firstname, lastname } = req.body;

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
      firstname,
      lastname,
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

    const correctPassword = await bcrypt.compare(password, user.hashed_password);

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 60
      })
      return res.status(201).json({ token, userId: user.user_id, email });
    }
    return res.status(400).send('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
})
app.get('/user', async (req, res) => {
  const client = new MongoClient(url);
  const userId = req.query.userId;
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
})

app.get('/users', async (req, res) => {
  const client = new MongoClient(url);
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const foundUsers = await users.find().toArray();
    res.send(foundUsers);
  } finally {
    await client.close();
  }
})

//Get all cars in the database
app.get('/cars', async (req, res) => {
  const client = new MongoClient(url);
  const userId = req.query.user_id;
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { user_id: userId };
    const foundUsers = await users.findOne(query);
    res.send(foundUsers)
  } finally {
    await client.close()
  }
})

//insert a new car
app.put('/cars', async (req, res) => {
  const client = new MongoClient(url);
  const userId = req.body.user_id;
  const formData = req.body.formData;
  const carId = req.body.id
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { user_id: userId };
    const updateDocument = {
      $push: {
        cars: {
          model: formData.model,
          year: formData.year,
          price: formData.price,
          url: formData.url,
          id: carId
        }
      },
    }
    const insertedCars = await users.updateOne(query, updateDocument);
    res.send(insertedCars);
  } finally {
    await client.close();
  }
})
//delete a car
app.delete('/cars', async (req, res) => {
  const client = new MongoClient(url);
  const userId = req.query.user_id;
  const carId = req.query.id;
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');
    const query = { user_id: userId };
    const updateDocument = {
      $pull: { "cars": { "id": carId } }
    }
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
})

app.put('/addmatch', async (req, res) => {
  const client = new MongoClient(url);
  const { userId, matchedUserId } = req.body;

  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchedUserId } }
    }
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
})

app.get('/allUsers', async (req, res) => {
  const client = new MongoClient(url);
  const userIds = JSON.parse(req.query.userIds);
  try {
    await client.connect();
    const database = client.db('app-data');
    const users = database.collection('users');

    const pipeline = [
      {
        '$match': {
          'user_id': {
            '$in': userIds
          }
        }
      }
    ]
    const foundUsers = await users.aggregate(pipeline).toArray();
    res.send(foundUsers);
  } finally {
    await client.close();
  }
})

app.get('/messages', async (req, res) => {
  const client = new MongoClient(url);
  const { userId, correspondingUserId } = req.query;
  try {
    await client.connect();
    const database = client.db('app-data');
    const messages = database.collection('messages');
    const query = {
      from_userId: userId, to_userId: correspondingUserId
    }
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }

})

app.post('/message', async (req, res) => {
  const client = new MongoClient(url);
  const message = req.body.message;
  try {
    await client.connect();
    const database = client.db('app-data');
    const messages = database.collection('messages');
    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
})

