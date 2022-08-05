// all imports

import express from 'express'

import mongoose from 'mongoose'

import dotenv from 'dotenv'
dotenv.config()

// create express app
const app = express()

// all middlewares
app.use('/', (req, res, next) => {
  res.send('Hello World')
})

// define port
// app.listen(5000)

// connect to mongoose/ mongoDB
mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.rqdidja.mongodb.net/Blog?retryWrites=true&w=majority`)
  .then(() => app.listen(5000))
  .then(() => console.log('Connected to MongoDB and Listening on port 5000'))
  .catch((err) => console.log(err))
