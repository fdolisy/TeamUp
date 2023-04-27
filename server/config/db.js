
// db.js
const mongoose = require('mongoose');
const db = process.env.ATLAS_URI;

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  mongoose.connect(db)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log('MongoDB connection error:', err));
};

module.exports = connectDB;