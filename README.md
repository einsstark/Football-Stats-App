This is a small app where I add football teams, edit their season stats, and see the results on a web page. I built it to practice a full-stack flow with a real database: store data, read it through an API, and show it in the browser.

## Why I built this

I want a clean example that saves data, returns it without surprises, and keeps the screen in sync with the database. This repo shows that end-to-end.

## What it does

You can create a team with season numbers, update those numbers, or delete the team.
You can fetch the first ten teams, get the average goals for a year, or view stats for one team.
The browser calls a small Node/Express API. The API writes and reads from MongoDB.

## How it’s set up

UI: React

API: Express

Database: MongoDB on localhost:27017

Axios handles requests from the UI to the API.

Mongoose defines the data model.

## Run it locally

1. **Make sure MongoDB is running** on your computer (`localhost:27017`).

2. **Open the project folder** in a terminal.

3. **Install packages**
    
    npm install
   
    npm install express body-parser

5. **Start the API**
    
    node server/server.js

    You should see:
    
        Connected to MongoDB successfully!
        Server running at http://localhost:3002

6. **Start the React app** (new terminal)
    
    npm start

7. **Open the app**
    
    http://localhost:3000  — UI (3000) talks to API (3002)
