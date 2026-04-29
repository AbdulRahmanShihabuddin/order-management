const express = require('express');
const MenuItem = require('../models/MenuItem');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

/**
 * GET /api/menu
 * Returns all menu items. Supports optional ?category= query filter.
 */
router.get('/', asyncHandler(async (req, res) => {
  const { category } = req.query;
  let query = {};
  
  if (category && category !== 'All') {
    // Exact match, but make it case-insensitive in Mongoose by using RegExp if we wanted,
    // or just assume categories are exactly matched. Data uses capital case.
    query.category = { $regex: new RegExp(`^${category}$`, 'i') };
  }

  const items = await MenuItem.find(query).select('-_id -__v');
  res.json(items);
}));

module.exports = router;
