// src/components/DeleteTeam.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; 

const DeleteTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [message, setMessage] = useState('');

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:3002/api/football/name/${teamName}`);
      setMessage('Team deleted successfully!');
      setTeamName('');
    } catch (error) {
      console.error(error);
      setMessage('Error deleting team');
    }
  };

  return (
    <div className="container">
      <h2>Delete Team</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          name="teamName" 
          placeholder="Team Name" 
          value={teamName} 
          onChange={handleTeamNameChange} 
          required 
        />
        <button type="submit">Delete Team</button>
      </form>
    </div>
  );
};

export default DeleteTeam;
