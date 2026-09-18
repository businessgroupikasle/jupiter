# Jupiter Industries - Backend API

Production-ready REST API backend for **Jupiter Industries**, built with Node.js, Express, TypeScript, Prisma ORM, and Supabase PostgreSQL.

## Features
- **Strict API Only**: Pure JSON endpoints with no frontend assets.
- **Prisma ORM**: Model definition for `Enquiry` table ready for Supabase PostgreSQL.
- **Zod Validation**: Strict validation for all customer enquiry fields.
- **Security**: Hardened with `helmet`, `cors`, and `express-rate-limit`.
- **Zero-Crash Resilience**: Built-in in-memory fallback for local offline testing when database connection string is pending.

## API Endpoints

### 1. Health Check
```http
GET /api/health
```
Response:
```json
{
  "status": "ok",
  "service": "Jupiter Industries API",
  "uptime": 12.4,
  "timestamp": "2026-09-11T17:22:00.000Z"
}
```

### 2. Submit Customer Enquiry
```http
POST /api/enquiries
Content-Type: application/json
```
Request Body:
```json
{
  "name": "Customer Name",
  "email": "customer@email.com",
  "phone": "+919876543210",
  "message": "I need a block making machine."
}
```
Success Response (HTTP 201):
```json
{
  "success": true,
  "message": "Thank you. Your enquiry has been submitted successfully.",
  "data": {
    "id": "cuid...",
    "name": "Customer Name",
    "email": "customer@email.com",
    "phone": "+919876543210",
    "message": "I need a block making machine.",
    "createdAt": "2026-09-11T17:22:00.000Z"
  }
}
```

### 3. List Customer Enquiries
```http
GET /api/enquiries
```

## Getting Started

### Option A: Run with Docker Compose (Recommended)

1. Make sure **Docker Desktop** is installed and running.
2. Start PostgreSQL and Backend containers:
```bash
docker compose up -d --build
```
3. Check container logs:
```bash
docker compose logs -f backend
```
4. Stop containers:
```bash
docker compose down
```

---

### Option B: Run Locally with Node.js & Docker PostgreSQL

1. **Start PostgreSQL in Docker**:
```bash
docker compose up -d postgres
```
2. **Install Dependencies**:
```bash
npm install
```
3. **Generate Prisma Client & Sync DB**:
```bash
npx prisma generate
npx prisma db push
```
4. **Start Development Server**:
```bash
npm run dev
```

---

### 5. Build for Production (Standalone Node.js)
```bash
npm run build
npm start
```

