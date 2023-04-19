import { Outlet, Link } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import 'bootstrap/dist/css/bootstrap.css';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput
}
from 'mdb-react-ui-kit';

function LoginComponent() {
    return (
      <MDBContainer className="my-5">
  
        <MDBCard>
          <MDBRow className='g-0'>
  
            <MDBCol md='6'>
              <MDBCardImage src='https://blog.wod.guru/wp-content/uploads/2022/10/WodGuru-Membership-Management-Software.png' alt="login form" className='rounded-start w-100'/>
            </MDBCol>
  
            <MDBCol md='6'>
              <MDBCardBody className='d-flex flex-column'>
  
                <div className='d-flex flex-row mt-2'>
                  <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                  <span className="h1 fw-bold mb-0">
                  <img src="https://github.com/gopinathsjsu/team-project-team-two0owt/blob/main/documentation/wireframes/Logo.png" width="600" alt="Logo"/>
                  </span>
                </div>
  
                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your account</h5>
  
                  <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>
  
                <MDBBtn className="mb-4 px-5" color='dark' size='lg'>Login</MDBBtn>
                <a className="small text-muted" href="#!">Forgot password?</a>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Don't have an account? <a href="#!" style={{color: '#393f81'}}>Register here</a></p>
  
                <div className='d-flex flex-row justify-content-start'>
                  <a href="#!" className="small text-muted me-1">Terms of use.</a>
                  <a href="#!" className="small text-muted">Privacy policy</a>
                </div>
  
              </MDBCardBody>
            </MDBCol>
  
          </MDBRow>
        </MDBCard>
  
      </MDBContainer>
    );
  }  

export default LoginComponent;
/*
function LoginComponent(props) {
  // for navigation redirection
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const vertical= 'top'
   const horizontal= 'center'
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    console.log(auth);
    if (auth && auth.employees[0].isLogged) {
      //navigateToRole(auth.employees[0].userRole);
    }
  }, []);

  function navigateToRole(role) {
    if (role == "member") {
      console.log("redirecting");
      // redirecting to airport employee dash board
     // navigate("/AirportEmp");
    } else {
      console.log("redirecting to member dashboard");

      //navigate("/AirlineEmp/");
    }
  }

  function checkRole(email) {
    // check  the role of user
    // var type = email.split('@')
    // var emp_type = type[1].split('.')
    // console.log("checking role")
    // console.log(emp_type[0])

    //implement the functionality with api

    return role;
  }

  function authorize(email, authorize) {
    // check if username and password are correct
    //implement the functionality with api
    return axios
      .post("/all/login", {
        emailAddress: email,
        password: authorize,
      })
      .then((response) => {
        //console.log(response);
        if (response.data.login == "successful") {
          setRole(response.data.type);
          var sitePersonel = {};
          var employees = [];
          sitePersonel.employees = employees;
          console.log(sitePersonel);

          var employee = {
            userName: email,
            userRole: response.data.type,
            isLogged: true,
          };
          sitePersonel.employees.push(employee);
          console.log(sitePersonel);

          console.log(JSON.stringify(sitePersonel));

          localStorage.setItem("auth", JSON.stringify(sitePersonel));
          props.changeLogged(true);
         // navigateToRole(response.data.type);
          return true;
        } else {
        handleClick();
          return false;
        };
      })
      .catch((error) => {
        console.log(error);
        handleClick()
        return false;
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.email.value);
    console.log(event.target.password.value);

    const email = event.target.email.value;
    const password = event.target.password.value;

    authorize(email, password);

    //const auth="{ \"username\":\""+email+"\", \"role\":\""+userRole+ "\" ,\"isLogged\":\""+isLogin+"\"}";
  }

  return (
    <>
    {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Invalid credentials
        </Alert>
        </Snackbar> *//*}
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
       
        key={vertical + horizontal}><Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        Invalid credentials
      </Alert>
      </Snackbar>
      
      <div className="LoginComponent">
        <section class="vh-100">
          <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://media.istockphoto.com/vectors/isolated-airport-building-vector-id648675420?k=20&m=648675420&s=612x612&w=0&h=zycuIclRasBCnYVfcleay_w9ScXOeZ0khTXYa3O3B1s="
                  class="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <div class="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      class="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                      required
                    />
                    {/* <label class="form-label" for="form3Example3">Email address</label> *//*}
                  </div>

                  <div class="form-outline mb-3">
                    <input
                      type="password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="Enter password"
                      required
                    />
                    {/* <label class="form-label" for="form3Example4">Password</label> *//*}
                  </div>

                  <div class="d-flex justify-content-between align-items-center">
                    <div class="form-check mb-0">
                      <input
                        class="form-check-input me-2"
                        type="checkbox"
                        value=""
                        id="form2Example3"
                      />
                      {/* <label class="form-check-label" for="form2Example3"> *//*}
                      Remember me
                      {/* </label> *//*}
                    </div>
                    <a href="#!" class="text-body">
                      Forgot password?
                    </a>
                  </div>

                  <div class="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="submit"
                      class="btn loginButton btn-lg"
                      style={{
                        paddingLeft: "2.5rem",
                        paddingRight: "2.5rem",
                      }}
                    >
                      Login
                    </button>
                    {/* <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
          class="link-danger">Register</a></p> *//*}
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div
class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

<div class="text-white mb-3 mb-md-0">
Copyright © 2020. All rights reserved.
</div>



<div>
<a href="#!" class="text-white me-4">
  <i class="fab fa-facebook-f"></i>
</a>
<a href="#!" class="text-white me-4">
  <i class="fab fa-twitter"></i>
</a>
<a href="#!" class="text-white me-4">
  <i class="fab fa-google"></i>
</a>
<a href="#!" class="text-white">
  <i class="fab fa-linkedin-in"></i>
</a>
</div>

</div> *//*}
        </section>
      </div>
    </>
  );
}

export default LoginComponent;*/