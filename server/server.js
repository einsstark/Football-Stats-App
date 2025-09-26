// server.js
const express = require('express');
const bodyParser = require('body-parser');
const FootballModel = require('./footballSchema'); // Importing the Mongoose model
require('./db'); // Importing the MongoDB connection
const cors = require('cors');

const app = express();
const PORT = 3002;


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(bodyParser.json()); // to use the bodyParser 

app.get('/', (req, res) => {
  res.send('Welcome to the Football Stats API!');
});


app.post('/api/football', async (req, res) => {
  try {
    const teamData = req.body;
    const newTeam = new FootballModel(teamData); 
    const savedTeam = await newTeam.save(); 
    res.status(201).json({ message: 'Team added successfully!', data: savedTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding team', error });
  }
});

// Retrieve all teams
app.get('/api/football', async (req, res) => {
  try {
    const teams = await FootballModel.find(); // Retrieve all data
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving teams', error });
  }
});

//Retrieve stats for a given team by name
app.get('/api/football/stats/:teamName', async (req, res) => {
  const { teamName } = req.params;

  try {
    // Find team stats by team name
    const teamStats = await FootballModel.findOne({ Team: teamName });

    if (!teamStats) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.status(200).json(teamStats);
  } catch (error) {
    console.error('Error fetching team stats:', error);
    res.status(500).json({ message: 'Error fetching team stats', error });
  }
});


// Delete a team by name
app.delete('/api/football/name/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const deletedTeam = await FootballModel.findOneAndDelete({ Team: teamName });
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json({ message: 'Team deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting team', error });
  }
});

// Update a team by name
app.put('/api/football/name/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const updatedTeam = await FootballModel.findOneAndUpdate(
      { Team: teamName },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.status(200).json({ message: 'Team updated successfully!', data: updatedTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating team', error });
  }
});

// Total games, wins, and draws for a specific team
app.get('/api/football/stats/:teamName', async (req, res) => {
  try {
    const { teamName } = req.params;
    const team = await FootballModel.findOne({ Team: teamName });
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const stats = {
      team: team.Team,
      gamesPlayed: team["Games Played"],
      wins: team.Win,
      draws: team.Draw,
    };
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching team stats', error });
  }
});

// to display first 10 records

app.get('/api/football/first10', async (req, res) => {
  try {
    const teams = await FootballModel.find().limit(10);
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching first 10 teams', error });
  }
});


// teams with average Goals For for a given year
app.get('/api/football/averageGoals/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const teams = await FootballModel.aggregate([
      { $match: { Year: parseInt(year) } },
      {
        $group: {
          _id: "$Team",
          averageGoalsFor: { $avg: "$Goals For" },
          gamesPlayed: { $sum: "$Games Played" },
          draws: { $sum: "$Draw" },
          wins: { $sum: "$Win" },
        }
      },
      {
        $project: {
          _id: 0,
          team: "$_id",
          averageGoalsFor: 1,
          gamesPlayed: 1,
          draws: 1,
          wins: 1
        }
      }
    ]);
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching average goals', error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
