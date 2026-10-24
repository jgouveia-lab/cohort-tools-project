# Cohort Tools – REST API

ExpressJS + MongoDB (Mongoose) REST API for the Cohort Tools React app, with JWT authentication.
Full API documentation (routes and models): [server/README.md](server/README.md).

## Running locally

Requirements: Node.js and a MongoDB instance (local `mongod` or a MongoDB Atlas connection string).

```bash
# 1. API
cd server
npm install
cp .env.sample .env   # then set TOKEN_SECRET (and MONGODB_URI if not using local MongoDB)
npm run seed          # imports cohorts.json + students.json (wipes those collections first)
npm run dev           # http://localhost:5005

# 2. Client (in another terminal)
cd client
npm install
npm run dev           # http://localhost:5173
```

## Server structure

```
server/
├── app.js                  # Express app: middleware, CORS, routes, error handlers
├── db/index.js             # Mongoose connection
├── models/                 # Cohort, Student, User schemas
├── routes/                 # cohort, student, auth, user routers
├── middleware/             # isAuthenticated (JWT) middleware
├── error-handling/         # 404 + central error handler
├── utils/                  # helpers (cohort query filter)
└── seeds/seed.js           # imports the JSON data, mapping numeric ids to ObjectIds
```
