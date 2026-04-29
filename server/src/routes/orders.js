const express = require('express');
const Order = require('../models/Order');
const { validateOrder, validateStatusUpdate } = require('../middleware/validate');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

// Simple ID generator: FB-XXXX
function generateOrderId() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `FB-${num}`;
}

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/', validateOrder, asyncHandler(async (req, res) => {
  const { customer, items, userId } = req.body;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 2.99;
  const taxes = parseFloat((subtotal * 0.0875).toFixed(2)); // 8.75% tax
  const total = parseFloat((subtotal + deliveryFee + taxes).toFixed(2));

  const now = new Date().toISOString();
  
  let orderId = generateOrderId();
  // Ensure unique order ID (simple while loop for simplicity here)
  let existingOrder = await Order.findOne({ id: orderId });
  while (existingOrder) {
    orderId = generateOrderId();
    existingOrder = await Order.findOne({ id: orderId });
  }

  const orderData = {
    id: orderId,
    customer,
    items,
    subtotal: parseFloat(subtotal.toFixed(2)),
    deliveryFee,
    taxes,
    total,
    status: 'received',
    estimatedDelivery: '25-30 mins',
    statusHistory: [{ status: 'received' }],
    userId,
  };

  const order = await Order.create(orderData);
  res.status(201).json(order);
}));

/**
 * GET /api/orders
 * List all orders, optionally filtered by userId
 */
router.get('/', asyncHandler(async (req, res) => {
  const { userId } = req.query;
  const filter = userId ? { userId } : {};
  const orders = await Order.find(filter).select('-_id -__v').sort({ createdAt: -1 });
  res.json(orders);
}));

/**
 * GET /api/orders/:id
 * Get a single order by ID
 */
router.get('/:id', asyncHandler(async (req, res) => {
  const order = await Order.findOne({ id: req.params.id }).select('-_id -__v');
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
}));

/**
 * PATCH /api/orders/:id/status
 * Update order status
 */
router.patch('/:id/status', validateStatusUpdate, asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findOne({ id: req.params.id });

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  order.status = status;
  order.statusHistory.push({ status });
  await order.save();

  // Return the updated object without Mongoose internals for consistency
  const updatedOrder = await Order.findOne({ id: req.params.id }).select('-_id -__v');
  res.json(updatedOrder);
}));

module.exports = router;
