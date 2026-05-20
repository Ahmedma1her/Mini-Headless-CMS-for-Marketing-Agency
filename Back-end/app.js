const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    callback(new Error(`CORS: origin ${origin} is not allowed`));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const userRoutes = require('./routes/authRoute');
const postRoutes = require('./routes/postRoute');

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => res.json({ status: 'Mini CMS API is running ' }));

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
}

connectDB();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(` Server running on http://localhost:${port}`);
  });
