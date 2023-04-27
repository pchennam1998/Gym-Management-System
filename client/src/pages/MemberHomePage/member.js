import React, { useEffect, useState } from 'react';
import axios from "axios";

function Member() {

    const initialValues = []
    const [pagedata,setPagedata]=useState(initialValues);
    const [emailAddress,setEmailaddress]=useState();

    //var emailAddress = "pavansai.chennam@sjsu.edu"

    useEffect(() => {
      // Update the document title using the browser API
      console.log("test")
      
      //setTest("aaa")
      axios.get('/all/member')
      .then((response) => {
        console.log(response.data);
        console.log(response.data.details);
        const data = response.data.details;
        setPagedata(data);
        
        setEmailaddress(data[0].emailAddress);
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
      <h2>{emailAddress}</h2>
    </div>
  );
}

export default Member;
