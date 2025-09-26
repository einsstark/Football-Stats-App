import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; 

const FetchTeams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/football');  
        setTeams(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching teams data');
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container">
      <h2>Football Teams</h2>
      {loading && <p>Loading data...</p>}
      {error && <div className="alert">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Games Played</th>
            <th>Wins</th>
            <th>Draws</th>
            <th>Losses</th>
            <th>Goals For</th>
            <th>Goals Against</th>
            <th>Points</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index}>
              {}
              <td>{team["Team"]}</td>
              <td>{team["Games Played"]}</td>
              <td>{team["Win"]}</td>
              <td>{team["Draw"]}</td>
              <td>{team["Loss"]}</td>
              <td>{team["Goals For"]}</td>
              <td>{team["Goals Against"]}</td>
              <td>{team["Points"]}</td>
              <td>{team["Year"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchTeams;
