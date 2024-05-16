import mongoose from 'mongoose'
import { config } from 'dotenv'
config()
const url = process.env.URL
export default mongoose
  .connect(url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err))
