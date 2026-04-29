require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    const email = 'user@email.com';
    const password = 'password123';

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists, updating password...');
      existingUser.password = password;
      await existingUser.save();
      console.log('✅ Updated user');
    } else {
      const user = new User({ email, password });
      await user.save();
      console.log(`✅ Seeded user: ${email}`);
    }

  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seedUser();
