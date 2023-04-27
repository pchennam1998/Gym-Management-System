import React, { useEffect, useState } from 'react';
import axios from "axios";

function Member() {

    const initialValues = {
      emailAddress: "",
      services: "",
      startTime: "",
      endTime: "",
      location: ""
    }
    const [data,setData]=useState(initialValues);
    const [emailAddress,setEmailaddress]=useState();

    //var emailAddress = "pavansai.chennam@sjsu.edu"

    useEffect(() => {
      // Update the document title using the browser API
      console.log("test")
      //setTest("aaa")
      axios.get('/all/member')
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        setData(data);
        setEmailaddress(data.emailAddress);
        console.log('Data is being retrieved');
        console.log(response.data);
      })
      .catch((e) => {
        console.log("123");
        alert(e.message);
      });
    },[]);

  return (
    <div>
    <h1>Member Home Page</h1>
      <h1>
        data= {}
        <div>emailAddress: {emailAddress}</div>
      </h1>
    </div>
  );
}

export default Member;
