import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

function AdminCreateSlots(){
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(0);
  const [maxCapacity, setMaxCapacity] = useState(0);
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);

  const history = useHistory();

  async function handleSlotCreation(event){
    event.preventDefault();

    const data = {
      startTime,
      duration,
      maxCapacity,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    }

    try {
      const response = await api.post('slots', data);

      alert(`Slot created succesfully`);

      history.push('/admin/slots')

    } catch (error) {
        alert(`Couldn't create slot`);
    }
  }

  return (
    <div className="admin-slots-container">
      <h1>Create Slot</h1>

      <form onSubmit={handleSlotCreation}>

          <strong>Start Time:</strong>
          <input 
            type="time"
            placeholder="Start Time e.g. 18:00"
            value={startTime}
            onChange={event => setStartTime(event.target.value)}
          />
          <strong>Duration (in minutes):</strong>
          <input 
            type="number"
            placeholder="Duration in minutes"
            value={duration}
            onChange={event => setDuration(event.target.value)}
          />
          <strong>Maximum capacity:</strong>
          <input 
            type="number" 
            placeholder="Maximum people capacity"
            value={maxCapacity}
            onChange={event => setMaxCapacity(event.target.value)}
          />

          <h2>Week days</h2>
          <div className="weekdays">
            <strong>Monday</strong>
            <input 
              type="checkbox" 
              value={monday}
              onChange={event => setMonday(event.target.checked)}
            />

            <strong>Tuesday</strong>
            <input 
              type="checkbox" 
              value={tuesday}
              onChange={event => setTuesday(event.target.checked)}
            />

            <strong>Wednesday</strong>
            <input 
              type="checkbox" 
              value={wednesday}
              onChange={event => setWednesday(event.target.checked)}
            />

            <strong>Thursday</strong>
            <input 
              type="checkbox" 
              value={thursday}
              onChange={event => setThursday(event.target.checked)}
            />

            <strong>Friday</strong>
            <input 
              type="checkbox" 
              value={friday}
              onChange={event => setFriday(event.target.checked)}
            />

            <strong>Saturday</strong>
            <input 
              type="checkbox" 
              value={saturday}
              onChange={event => setSaturday(event.target.checked)}
            />

            <strong>Sunday</strong>
            <input 
              type="checkbox" 
              value={sunday}
              onChange={event => setSunday(event.target.checked)}
            />
          </div>

          <button className="button" type="submit">Create Slot</button>

      </form>
    
    </div>
  )
}

export default AdminCreateSlots;