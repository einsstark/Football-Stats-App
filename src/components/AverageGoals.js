// src/components/AverageGoals.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; 

const AverageGoals = () => {
  const [year, setYear] = useState('');
  const [teams, setTeams] = useState([]);
  const [message, setMessage] = useState('');

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3002/api/football/averageGoals/${year}`);
      setTeams(response.data);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Error fetching average goals');
      setTeams([]);
    }
  };

  return (
    <div className="container">
      <h2>Average Goals For by Year</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="year" 
          type="number" 
          placeholder="Year" 
          value={year} 
          onChange={handleYearChange} 
          required 
        />
        <button type="submit">Get Average Goals</button>
      </form>
      {message && <div className="alert">{message}</div>}
      {teams.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Average Goals For</th>
              <th>Games Played</th>
              <th>Wins</th>
              <th>Draws</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index}>
                <td>{team.team}</td>
                <td>{team.averageGoalsFor.toFixed(2)}</td>
                <td>{team.gamesPlayed}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AverageGoals;
