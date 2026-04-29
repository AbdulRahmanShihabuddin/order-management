require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const updateBbqBurgerImage = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // A reliable, different image for the BBQ Bacon Burger
    const newImageUrl = 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80';
    const name = 'BBQ Bacon Burger';

    const result = await MenuItem.updateOne(
      { name },
      { $set: { image: newImageUrl } }
    );

    if (result.matchedCount > 0) {
      console.log(`✅ Successfully updated image for: ${name}`);
    } else {
      console.log(`❌ Could not find item: ${name}`);
    }

  } catch (error) {
    console.error('Error updating image:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

updateBbqBurgerImage();
