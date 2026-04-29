const request = require('supertest');
const app = require('../src/index');

describe('GET /api/menu', () => {
  it('returns an array of menu items', async () => {
    const res = await request(app).get('/api/menu');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('each item has required fields', async () => {
    const res = await request(app).get('/api/menu');
    const item = res.body[0];
    expect(item).toHaveProperty('id');
    expect(item).toHaveProperty('name');
    expect(item).toHaveProperty('description');
    expect(item).toHaveProperty('price');
    expect(item).toHaveProperty('image');
    expect(item).toHaveProperty('category');
    expect(item).toHaveProperty('rating');
  });

  it('filters by category', async () => {
    const res = await request(app).get('/api/menu?category=Burgers');
    expect(res.status).toBe(200);
    res.body.forEach((item) => {
      expect(item.category).toBe('Burgers');
    });
  });

  it('returns all items when category is All', async () => {
    const all = await request(app).get('/api/menu');
    const filtered = await request(app).get('/api/menu?category=All');
    expect(filtered.body.length).toBe(all.body.length);
  });
});
