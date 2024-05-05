import mongoose from "mongoose";


export default mongoose.connect('mongodb://localhost:27017/bookManagementSystem')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));