# BackChallenge — Login API (minimal)

Micro backend that exposes a single login endpoint implemented with Express + TypeScript.

Quick start (PowerShell):

```powershell
npm install
npm run dev
```

Database (MySQL) setup
- Create a database named `challenge` (or set `DB_NAME` in `.env`).
- Ensure `.env` contains DB credentials (see `.env.example`).
- The server will create the `users` table on startup if it exists and credentials are valid.

POST /auth/login
- Content-Type: application/json
- Body: { "email": "user@example.com", "password": "password123" }

POST /auth/register
- Content-Type: application/json
- Body: { "email": "new@example.com", "password": "secure" }

GET /auth/me
- Header: `Authorization: Bearer <token>`

Metrics endpoints (protected):
- GET /metrics - returns metrics for all users
- GET /metrics/:userId - returns metrics for the given user id

Environment
- Copy `.env.example` to `.env` and set `JWT_SECRET` for production.

Postman
- Import the included `postman_collection.json` into Postman to test all endpoints.
- Alternatively, export requests from this API using Postman's collection export feature.

Notes
- Users are stored in a single MySQL `users` table (`id`, `name`, `email`, `password_hash`, `created_at`, `last_login`, `login_count`).
- The server creates the `users` table automatically on startup if the database exists and credentials in `.env` are correct.
- For production you should use a managed migration system and a real DB user with limited privileges.
