import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const url = process.env.URL || 'mongodb://localhost:27017/bookManagementSystem'

mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err))
