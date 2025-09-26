// src/components/UpdateTeam.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Ensure the path is correct

const UpdateTeam = () => {
  const [teamName, setTeamName] = useState('');
  const [updateData, setUpdateData] = useState({
    "Games Played": '',
    Win: '',
    Draw: '',
    Loss: '',
    "Goals For": '',
    "Goals Against": '',
    Points: '',
    Year: ''
  });
  const [message, setMessage] = useState('');

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3002/api/football/name/${teamName}`, {
        ...updateData,
        "Games Played": updateData["Games Played"] ? Number(updateData["Games Played"]) : undefined,
        Win: updateData.Win ? Number(updateData.Win) : undefined,
        Draw: updateData.Draw ? Number(updateData.Draw) : undefined,
        Loss: updateData.Loss ? Number(updateData.Loss) : undefined,
        "Goals For": updateData["Goals For"] ? Number(updateData["Goals For"]) : undefined,
        "Goals Against": updateData["Goals Against"] ? Number(updateData["Goals Against"]) : undefined,
        Points: updateData.Points ? Number(updateData.Points) : undefined,
        Year: updateData.Year ? Number(updateData.Year) : undefined
      });
      setMessage('Team updated successfully!');
      // Reset form
      setTeamName('');
      setUpdateData({
        "Games Played": '',
        Win: '',
        Draw: '',
        Loss: '',
        "Goals For": '',
        "Goals Against": '',
        Points: '',
        Year: ''
      });
    } catch (error) {
      console.error(error);
      setMessage('Error updating team');
    }
  };

  return (
    <div className="container">
      <h2>Update Team</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          name="teamName" 
          placeholder="Team Name" 
          value={teamName} 
          onChange={handleTeamNameChange} 
          required 
        />
        <input name="Games Played" type="number" placeholder="Games Played" value={updateData["Games Played"]} onChange={handleUpdateChange} />
        <input name="Win" type="number" placeholder="Wins" value={updateData.Win} onChange={handleUpdateChange} />
        <input name="Draw" type="number" placeholder="Draws" value={updateData.Draw} onChange={handleUpdateChange} />
        <input name="Loss" type="number" placeholder="Losses" value={updateData.Loss} onChange={handleUpdateChange} />
        <input name="Goals For" type="number" placeholder="Goals For" value={updateData["Goals For"]} onChange={handleUpdateChange} />
        <input name="Goals Against" type="number" placeholder="Goals Against" value={updateData["Goals Against"]} onChange={handleUpdateChange} />
        <input name="Points" type="number" placeholder="Points" value={updateData.Points} onChange={handleUpdateChange} />
        <input name="Year" type="number" placeholder="Year" value={updateData.Year} onChange={handleUpdateChange} />
        <button type="submit">Update Team</button>
      </form>
    </div>
  );
};

export default UpdateTeam;
