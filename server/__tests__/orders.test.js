const request = require('supertest');
const app = require('../src/index');
const store = require('../src/store');

// Reset orders before each test
beforeEach(() => {
  store.orders = [];
});

const validOrder = {
  customer: {
    fullName: 'John Doe',
    address: '123 Fresh Lane, Culinary District, CA 90210',
    phoneNumber: '(555) 123-4567',
  },
  items: [
    { menuItemId: 'item-001', name: 'Classic Smashburger', price: 12.99, quantity: 1, image: 'test.jpg' },
    { menuItemId: 'item-002', name: 'Wood-Fired Margherita', price: 16.50, quantity: 2, image: 'test.jpg' },
  ],
};

describe('POST /api/orders', () => {
  it('creates an order with valid data', async () => {
    const res = await request(app).post('/api/orders').send(validOrder);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.id).toMatch(/^FB-\d{4}$/);
    expect(res.body.status).toBe('received');
    expect(res.body.customer.fullName).toBe('John Doe');
    expect(res.body.items).toHaveLength(2);
    expect(res.body.subtotal).toBeCloseTo(45.99, 2);
    expect(res.body.deliveryFee).toBe(2.99);
    expect(typeof res.body.taxes).toBe('number');
    expect(typeof res.body.total).toBe('number');
    expect(res.body.statusHistory).toHaveLength(1);
    expect(res.body.statusHistory[0].status).toBe('received');
  });

  it('returns 400 when customer is missing', async () => {
    const res = await request(app).post('/api/orders').send({ items: validOrder.items });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Validation failed');
  });

  it('returns 400 when items is empty', async () => {
    const res = await request(app).post('/api/orders').send({ customer: validOrder.customer, items: [] });
    expect(res.status).toBe(400);
    expect(res.body.details).toContain('items must be a non-empty array');
  });

  it('returns 400 when customer fields are missing', async () => {
    const res = await request(app).post('/api/orders').send({
      customer: { fullName: '' },
      items: validOrder.items,
    });
    expect(res.status).toBe(400);
    expect(res.body.details.length).toBeGreaterThan(0);
  });
});

describe('GET /api/orders', () => {
  it('returns all orders', async () => {
    await request(app).post('/api/orders').send(validOrder);
    await request(app).post('/api/orders').send(validOrder);

    const res = await request(app).get('/api/orders');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
  });
});

describe('GET /api/orders/:id', () => {
  it('returns an order by ID', async () => {
    const created = await request(app).post('/api/orders').send(validOrder);
    const res = await request(app).get(`/api/orders/${created.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(created.body.id);
  });

  it('returns 404 for non-existent order', async () => {
    const res = await request(app).get('/api/orders/FB-0000');
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Order not found');
  });
});

describe('PATCH /api/orders/:id/status', () => {
  it('updates order status', async () => {
    const created = await request(app).post('/api/orders').send(validOrder);

    const res = await request(app)
      .patch(`/api/orders/${created.body.id}/status`)
      .send({ status: 'preparing' });

    expect(res.status).toBe(200);
    expect(res.body.status).toBe('preparing');
    expect(res.body.statusHistory).toHaveLength(2);
    expect(res.body.statusHistory[1].status).toBe('preparing');
  });

  it('returns 400 for invalid status', async () => {
    const created = await request(app).post('/api/orders').send(validOrder);

    const res = await request(app)
      .patch(`/api/orders/${created.body.id}/status`)
      .send({ status: 'invalid_status' });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Invalid status');
  });

  it('returns 404 for non-existent order', async () => {
    const res = await request(app)
      .patch('/api/orders/FB-0000/status')
      .send({ status: 'preparing' });

    expect(res.status).toBe(404);
  });
});
