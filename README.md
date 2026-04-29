# FreshBites — Food Ordering Application

A full-stack food ordering application built with React, Vite, TailwindCSS, Express, and Node.js. Converted from FreshBites Stitch design exports into a fully functional application.

## Architecture

```
order-management/
├── client/          → React + Vite frontend
├── server/          → Express REST API backend
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+ and npm

### Install Dependencies
```bash
# Backend
cd server && npm install

# Frontend
cd client && npm install
```

### Run Development Servers
```bash
# Terminal 1: Start API server (port 3001)
cd server && npm run dev

# Terminal 2: Start frontend (port 5173)
cd client && npm run dev
```

Open http://localhost:5173 in your browser.

### Run Tests
```bash
# Backend tests
cd server && npm test

# Frontend tests
cd client && npm test
```

## API Documentation

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| GET    | `/api/menu`              | List menu items          |
| GET    | `/api/menu?category=X`   | Filter by category       |
| POST   | `/api/orders`            | Create an order          |
| GET    | `/api/orders`            | List all orders          |
| GET    | `/api/orders/:id`        | Get order by ID          |
| PATCH  | `/api/orders/:id/status` | Update order status      |
| GET    | `/api/health`            | Health check             |

### Create Order Request Body
```json
{
  "customer": {
    "fullName": "John Doe",
    "address": "123 Fresh Lane",
    "phoneNumber": "(555) 123-4567"
  },
  "items": [
    {
      "menuItemId": "item-001",
      "name": "Classic Smashburger",
      "price": 12.99,
      "quantity": 1,
      "image": "url"
    }
  ]
}
```

## Routes

| Route            | Page            | Description                    |
|------------------|-----------------|--------------------------------|
| `/`              | Menu + Cart     | Browse menu, manage cart       |
| `/checkout`      | Checkout        | Delivery form + order summary  |
| `/tracking/:id`  | Order Tracking  | Live status stepper + details  |

## Design System

Based on the FreshBites Stitch design system:
- **Primary**: `#ab3500` (warm orange)
- **Background**: `#fff8f6` (soft cream)
- **Typography**: Inter (Google Fonts)
- **Spacing**: 4px baseline grid
- **Corners**: 4px–24px radius scale
- **Elevation**: Ambient shadows (8–12% opacity)

## Key Features

- **Menu**: API-driven items with category filters and search
- **Cart**: Real-time quantity management with calculated totals
- **Checkout**: Validated form with field-level errors
- **Order Tracking**: Auto-progressing status stepper (8s intervals)
- **UI States**: Loading skeletons, error banners, empty states

## Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | React 18, Vite, TailwindCSS        |
| State      | React Context + useReducer          |
| Routing    | React Router v6                     |
| Backend    | Node.js, Express                    |
| Testing    | Jest + Supertest, Vitest + RTL      |
| Storage    | In-memory (no DB required)          |
