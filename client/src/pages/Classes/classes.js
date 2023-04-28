import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import dateFormat from 'dateformat';

const Clsses = () => {

	const [location, setLocation] = useState('');
	const [record, setRecord] = useState(null);
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
	try {
		axios.get('/api/genInfo', { location: location})
		.then((response) => {
			console.log(response);})
		// const response = await axios.get('/api/genInfo', { location: location});
		// setRecord(response.data);
		// setError('');
	  } catch (err) {
		setRecord(null);
		setError(err?.response?.data?.message || 'An error occured');
	  }
	  };

	  const handleChange = (e) => {
		setLocation(e.target.value);
	  }

return (
	<form onSubmit={handleSubmit}>
      <label htmlFor="location">Location:</label>
      <input type="text" id="location" name="location" value={location} onChange={handleChange} />
      <button background-color="#b66040" type="submit">Submit</button>
      {record && (
        <div>
          <h2>{record.location}</h2>
          <p>{record.pricing}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
);
};

export default Clsses;