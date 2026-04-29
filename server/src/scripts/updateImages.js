require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

const imageUpdates = {
  'Classic Smashburger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
  'Wood-Fired Margherita': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80',
  'Crispy Chicken Salad': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  'Deluxe Sushi Combo': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
  'BBQ Bacon Burger': 'https://images.unsplash.com/photo-1594212202875-c9fc86927581?auto=format&fit=crop&w=800&q=80',
  'Pepperoni Supreme': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=800&q=80',
  'Salmon Sashimi Platter': 'https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&w=800&q=80',
  'Mediterranean Bowl': 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=800&q=80'
};

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    for (const [name, imageUrl] of Object.entries(imageUpdates)) {
      const result = await MenuItem.updateOne(
        { name },
        { $set: { image: imageUrl } }
      );
      if (result.matchedCount > 0) {
        console.log(`Updated image for: ${name}`);
      } else {
        console.log(`Could not find item: ${name}`);
      }
    }

    console.log('Successfully updated all images.');
  } catch (error) {
    console.error('Error updating images:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

updateImages();
