import React, { useEffect, useState } from 'react';
import axios from "axios";
import dateFormat from 'dateformat';
import { useNavigate } from "react-router-dom";

function Member() {

  // const [exercises, setExercises] = useState([]);
  // const [selectedExercise, setSelectedExercise] = useState(null);
    

    const navigate = useNavigate();
    const initialValues = []
    const [pagedata,setPagedata]=useState(initialValues);
    //const [emailAddress,setEmailaddress]=useState();
    const [services,setServices]=useState();
    const [startTime,setStarttime]=useState();
    const [endTime, setEndtime]=useState();
    const [location, setLocation]=useState();

    useEffect(() => {
      
      axios.get('/all/member')
      .then((response) => {
        const data = response.data.details;
        setPagedata(data);
  
        //setEmailaddress(data[0].emailAddress);
        setServices(data[0].services);
        setStarttime(data[0].startTime);
        setEndtime(data[0].endTime);
        setLocation(data[0].location);

        //startTime = dateFormat({startTime}, "dddd, mmmm dS, yyyy");
        dateFormat(startTime, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        dateFormat(endTime, "dddd, mmmm dS, yyyy, h:MM:ss TT");
        //endTime = dateFormat({endTime}, "dddd, mmmm dS, yyyy");
      })
      .catch((e) => {
        console.log("123");
        alert(e.message);
      });
    },[]);

  const handleLogout = () => {
      console.log("Logout came")
      localStorage.removeItem('auth');
      navigate('/login');
  }

  return (
    <div>
    <div>
    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
    </div>
    <h1>Member Dashboard</h1><br></br>
      {/* <h2>{emailAddress}</h2> */}
      <div>
      <h3 color='#'>Class Schedule for a week</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' hegiht="350" width="450" alt="sample"></img>
      <h4>{services} at {location}</h4>
      <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4>
      </div>
    </div>
  );
}

export default Member;
