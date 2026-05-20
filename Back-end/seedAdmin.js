/**
 * seedAdmin.js
 * Run once: node seedAdmin.js
 * Creates an admin user: email=admin@cms.com / password=admin
 */
const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const dotenv   = require('dotenv');
dotenv.config();

const User = require('./models/User');

async function seed() {
  await mongoose.connect(process.env.DB_URL);
  console.log('Connected to MongoDB');

  const existing = await User.findOne({ email: 'admin@cms.com' });
  if (existing) {
    console.log(' Admin already exists:', existing.username, '/', existing.role);
    return process.exit(0);
  }

  const hashed = await bcrypt.hash('admin', 10);
  await User.create({
    username: 'admin',
    email:    'admin@cms.com',
    password:  hashed,
    role:     'admin',
  });

  console.log(' Admin user created!');
  console.log('   Email   : admin@cms.com');
  console.log('   Password: admin');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
