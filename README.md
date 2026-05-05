# Anti-Fraud API

Anti-Fraud API is a backend service for collecting user events and calculating fraud risk scores based on user activity, IP addresses, and suspicious behavior patterns.

The project was built as a portfolio backend application using Node.js, TypeScript, Express, PostgreSQL, and Prisma.

## Features

- Create user events
- Store events in PostgreSQL
- Get events with pagination
- Filter events by user ID, event type, and IP address
- Calculate user fraud risk score
- Detect suspicious IP addresses
- Detect high recent activity
- Detect multiple users from the same IP address
- Save risk check history
- Get risk check history by user ID
- Global error handling
- Environment-based configuration

## Tech Stack

- Node.js
- TypeScript
- Express.js
- PostgreSQL
- Prisma ORM
- dotenv

## Project Structure

```txt
src/
├── config/
├── controllers/
├── middlewares/
├── routes/
├── services/
├── types/
├── utils/
├── app.ts
└── server.ts
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/anti_fraud_db"
```

You can use `.env.example` as a template.

## Installation

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Sync database schema:

```bash
npx prisma db push
```

Start development server:

```bash
npm run dev
```

The server will run on:

```txt
http://localhost:5000
```

## API Endpoints

### Health Check

```http
GET /health
```

Example response:

```json
{
  "status": "ok",
  "message": "Anti-Fraud API is running"
}
```

---

### Create Event

```http
POST /events
```

Request body:

```json
{
  "userId": "user_1",
  "type": "login",
  "ip": "10.0.0.1",
  "email": "user@example.com",
  "phone": "+48123456789"
}
```

Required fields:

```txt
userId
type
ip
```

Allowed event types:

```txt
login
order
request
```

---

### Get Events

```http
GET /events
```

Supports pagination:

```http
GET /events?page=1&limit=10
```

Supports filters:

```http
GET /events?userId=user_1
GET /events?type=login
GET /events?ip=10.0.0.1
GET /events?userId=user_1&type=login&page=1&limit=10
```

Example response:

```json
{
  "status": "success",
  "page": 1,
  "limit": 10,
  "totalEvents": 3,
  "totalPages": 1,
  "results": 3,
  "data": []
}
```

---

### Get Events by User ID

```http
GET /events/user/:userId
```

Example:

```http
GET /events/user/user_1
```

---

### Calculate User Risk

```http
GET /risk/:userId
```

Example:

```http
GET /risk/user_1
```

Example response:

```json
{
  "status": "success",
  "data": {
    "userId": "user_1",
    "eventsCount": 5,
    "recentEventsCount": 2,
    "hasSuspiciousIp": true,
    "maxUsersFromSameIp": 3,
    "riskScore": 65,
    "reasons": [
      "Medium total event count",
      "Suspicious IP detected",
      "Multiple users from same IP"
    ]
  }
}
```

---

### Get Risk Check History

```http
GET /risk/:userId/history
```

Example:

```http
GET /risk/user_1/history
```

Example response:

```json
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "id": "uuid",
      "userId": "user_1",
      "riskScore": 65,
      "reasons": [
        "Suspicious IP detected",
        "Multiple users from same IP"
      ],
      "createdAt": "2026-05-05T12:00:00.000Z"
    }
  ]
}
```

## Risk Rules

The API calculates a risk score based on several fraud indicators.

### Total User Activity

| Condition | Score |
|---|---:|
| 1-3 events | 20 |
| 4-6 events | 50 |
| 7+ events | 80 |

### Recent Activity

If a user has many events in a short time window, the risk score increases.

```txt
High recent activity score: 70
```

### Suspicious IP

If the user has used an IP address from the suspicious IP list, the risk score increases.

```txt
Suspicious IP score: 60
```

### Multiple Users from Same IP

If many different users use the same IP address, the risk score increases.

```txt
Shared IP score: 65
```

## Database Models

### Event

Stores user activity events.

Fields:

```txt
id
userId
type
ip
email
phone
createdAt
```

### RiskCheck

Stores historical fraud risk checks.

Fields:

```txt
id
userId
riskScore
reasons
createdAt
```

## Example Test Flow

1. Create several events:

```http
POST /events
```

2. Check risk score:

```http
GET /risk/user_1
```

3. Check risk history:

```http
GET /risk/user_1/history
```

## Scripts

Common scripts used in this project:

```bash
npm run dev
npm run build
npm start
```

