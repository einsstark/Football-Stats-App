import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; 

const AddTeam = () => {
  const [formData, setFormData] = useState({
    Team: '',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3002/api/football', {
        ...formData,
        "Games Played": Number(formData["Games Played"]),
        Win: Number(formData.Win),
        Draw: Number(formData.Draw),
        Loss: Number(formData.Loss),
        "Goals For": Number(formData["Goals For"]),
        "Goals Against": Number(formData["Goals Against"]),
        Points: Number(formData.Points),
        Year: Number(formData.Year)
      });
      setMessage('Team added successfully!');
      
      setFormData({
        Team: '',
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
      setMessage('Error adding team');
    }
  };

  return (
    <div className="container">
      <h2>Add New Team</h2>
      {message && <div className="alert">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input name="Team" placeholder="Team" value={formData.Team} onChange={handleChange} required />
        <input name="Games Played" type="number" placeholder="Games Played" value={formData["Games Played"]} onChange={handleChange} required />
        <input name="Win" type="number" placeholder="Wins" value={formData.Win} onChange={handleChange} required />
        <input name="Draw" type="number" placeholder="Draws" value={formData.Draw} onChange={handleChange} required />
        <input name="Loss" type="number" placeholder="Losses" value={formData.Loss} onChange={handleChange} required />
        <input name="Goals For" type="number" placeholder="Goals For" value={formData["Goals For"]} onChange={handleChange} required />
        <input name="Goals Against" type="number" placeholder="Goals Against" value={formData["Goals Against"]} onChange={handleChange} required />
        <input name="Points" type="number" placeholder="Points" value={formData.Points} onChange={handleChange} required />
        <input name="Year" type="number" placeholder="Year" value={formData.Year} onChange={handleChange} required />
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
};

export default AddTeam;
