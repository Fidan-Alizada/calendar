import React, { useState } from 'react';
import './MeetingModal.css';

const MeetingModal = ({ selectedDate, addMeeting, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const meeting = {
      title,
      date: selectedDate.toISOString(),
    };
    addMeeting(meeting);
    setTitle("");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <form onSubmit={handleSubmit}>
          <label>
            
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder='Meeting Title'
            />
          </label>
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
};

export default MeetingModal;
