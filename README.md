A small full-stack app I built to practice clean CRUD, API design, and DB → API → UI wiring.
It lets me add teams, update stats, run simple queries (first 10, averages, per-team stats), and view them in a React UI.

I made this because real projects always need persistent data, simple endpoints, and a UI that doesn’t break when the data changes.

**What it does**

Add / edit / delete football teams with season stats

Query: first 10 teams, averages per year, per-team stats

React UI calling the Express API (Axios)

MongoDB for persistence (Mongoose model)

**Tech**

Frontend: React (Vite or CRA-style dev server), Axios

Backend: Node.js, Express, CORS, Mongoose

DB: MongoDB (local), Compass for inspection

**Prereqs**

Node 18+ (node -v)

MongoDB running locally on 27017 (Compass can confirm)

Install
# from project root (where package.json and /server live)
npm install
npm install express body-parser

**Run **
# 1) Start MongoDB (service)
# macOS (Homebrew):
#   brew services start mongodb-community@7.0
# Windows: start MongoDB service
# Linux: sudo systemctl start mongod

# 2) Start API
node server/server.js
# logs: "Connected to MongoDB successfully!" + "Server running at http://localhost:3002"

# 3) Start React app (new terminal)
npm start
# open http://localhost:3000


Default endpoints: API on http://localhost:3002, UI on http://localhost:3000.
