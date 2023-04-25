import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Member = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    axios.get(`/api/login?userId=${user.id}`).then((response) => {
      setWorkouts(response.data);
    });
  }, [user.id]);

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <h2>Your Workouts:</h2>
      {workouts.map((workout) => (
        <div key={workout.id}>
          <Link to={`/workouts/${workout.id}`}>
            <h3>{workout.name}</h3>
          </Link>
          <p>{workout.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Member;
