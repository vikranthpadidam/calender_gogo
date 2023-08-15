import React, { useState } from 'react';

const EventForm = () => {
  const [eventDetails, setEventDetails] = useState({
    summary: '',
    description: '',
    startDateTime: '',
    endDateTime: '',
    attendeeEmail: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/eventForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formContainerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
  };

  const headerStyle = {
    fontSize: '1.5rem',
    marginBottom: '15px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '3px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  
  return (
    <div style={formContainerStyle}>
      <h2 style={headerStyle}>Schedule Event</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Summary:
          <input
            type="text"
            name="summary"
            value={eventDetails.summary}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Description:
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Start Date and Time:
          <input
            type="datetime-local"
            name="startDateTime"
            value={eventDetails.startDateTime}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          End Date and Time:
          <input
            type="datetime-local"
            name="endDateTime"
            value={eventDetails.endDateTime}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Attendee Email:
          <input
            type="email"
            name="attendeeEmail"
            value={eventDetails.attendeeEmail}
            onChange={handleInputChange}
            style={inputStyle}
          />
        </label>
        <button
          type="submit"
          style={Object.assign({}, buttonStyle, { ':hover': buttonHoverStyle })}
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;