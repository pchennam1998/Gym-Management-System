import React, { useEffect, useState } from 'react';
import axios from "axios";
import dateFormat from 'dateformat';

function Member() {

    const initialValues = []
    const [pagedata,setPagedata]=useState(initialValues);
    //const [emailAddress,setEmailaddress]=useState();
    const [services,setServices]=useState();
    const [startTime,setStarttime]=useState();
    const [endTime, setEndtime]=useState();
    const [location, setLocation]=useState();

    useEffect(() => {
      // Update the document title using the browser API
      
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
        dateFormat(endTime, "dddd, mmmm dS, yyyy, h:MM:ss TT")
        //endTime = dateFormat({endTime}, "dddd, mmmm dS, yyyy");
      })
      .catch((e) => {
        console.log("123");
        alert(e.message);
      });
    },[]);

  return (
    <div>
    <h1>Member Dashboard</h1><br></br>
      {/* <h2>{emailAddress}</h2> */}
      <div>
      <h3 color='#'>Class Schedule for a week</h3>
      <img src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' hegiht="350" width="450"></img>
      <h4>{services} at {location}</h4>
      <h4>{dateFormat(startTime, "dddd, h:MM TT")} to {dateFormat(endTime, "dddd, h:MM TT")}</h4>
      </div>
    </div>
  );
}

export default Member;
