const PORT = 8000;
const express = require('express');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();

const url = 'mongodb+srv://xinwang:QxMKRWywKMtPyqrr@cluster0.krnu1.mongodb.net/?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());

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


// app.put('/user', async (req, res) => {
//   const client = new MongoClient(url);
//   const formData = req.body.formData;
//   try {
//     await client.connect();
//     const database = client.db('app-data');
//     const users = database.collection('users');

//     const query = { user_id: formData.user_id };
//     const updateDocument = {
//       $set: {
//         first_name: formData.first_name,
//         matches: formData.matches,
//         cars: [{
//           model: formData.Model,
//           year: formData.Year,
//           price: formData.Price,
//           url: formData.url
//         }]
//       },
//     }
//     const insertedUser = await users.updateOne(query, updateDocument);
//     res.send(insertedUser);
//   } finally {
//     await client.close();
//   }
// })

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
    console.log('foundUsers', foundUsers);
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
  console.log('userid', userId);
  console.log('formData', formData);
  console.log('carId', carId);
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
  console.log('req.query', req.query);
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
    console.log('user', user);
    res.send(user);
  } finally {
    await client.close();
  }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT));
