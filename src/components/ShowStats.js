import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

const ShowStats = () => {
  const [teamName, setTeamName] = useState('');
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState('');

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3002/api/football/stats/${teamName}`);
      setStats(response.data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching team stats:', error);
      setMessage('Error fetching team stats');
      setStats(null);
    }
  };

  return (
    <div className="container">
      <h2>Team Statistics</h2>
      <form onSubmit={handleSubmit}>
        <input 
          name="teamName" 
          placeholder="Team Name" 
          value={teamName} 
          onChange={handleTeamNameChange} 
          required 
        />
        <button type="submit">Get Stats</button>
      </form>
      {message && <div className="alert">{message}</div>}
      {stats && (
        <div className="stats">
          <h3><strong>{stats.Team}</strong></h3>
          <p>Games Played: {stats["Games Played"]}</p>
          <p>Wins: {stats.Win}</p>
          <p>Draws: {stats.Draw}</p>
        </div>
      )}
    </div>
  );
};

export default ShowStats;
