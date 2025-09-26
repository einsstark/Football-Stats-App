const mongoose = require('mongoose');

// Define the Football Schema with fields EXACTLY as in the database
const footballSchema = new mongoose.Schema({
  Team: { 
    type: String, 
    required: [true, 'Team name is required'], 
    trim: true 
  },
  "Games Played": { 
    type: Number, 
    required: [true, 'Games played count is required'], 
    min: [0, 'Games played cannot be negative'] 
  },
  Win: { 
    type: Number, 
    required: [true, 'Win count is required'], 
    min: [0, 'Win count cannot be negative'] 
  },
  Draw: { 
    type: Number, 
    required: [true, 'Draw count is required'], 
    min: [0, 'Draw count cannot be negative'] 
  },
  Loss: { 
    type: Number, 
    required: [true, 'Loss count is required'], 
    min: [0, 'Loss count cannot be negative'] 
  },
  "Goals For": { 
    type: Number, 
    required: [true, 'Goals scored count is required'], 
    min: [0, 'Goals scored cannot be negative'] 
  },
  "Goals Against": { 
    type: Number, 
    required: [true, 'Goals conceded count is required'], 
    min: [0, 'Goals conceded cannot be negative'] 
  },
  Points: { 
    type: Number, 
    required: [true, 'Points are required'], 
    min: [0, 'Points cannot be negative'] 
  },
  Year: { 
    type: Number, 
    required: [true, 'Year is required'], 
    min: [1900, 'Year cannot be earlier than 1900'] 
  }
}, {
  timestamps: true 
});

const Football = mongoose.model('Football', footballSchema, 'FootBallData');

module.exports = Football;
