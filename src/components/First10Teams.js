import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style.css'; 

const First10Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFirst10 = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/football/first10');
        setTeams(response.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching first 10 teams');
      }
    };

    fetchFirst10();
  }, []);

  return (
    <div className="container">
      <h2>First 10 Teams</h2>
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

export default First10Teams;
