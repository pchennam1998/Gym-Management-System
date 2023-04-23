import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBRipple
  } from 'mdb-react-ui-kit';
  
const Service = () => {
    return (
      <MDBCard>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg' fluid alt='...' hegiht="350" width="450"/>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle textAlign="center">Thread Mill</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </MDBCardText>
        </MDBCardBody>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://fitpage.in/wp-content/uploads/2021/11/Article_Banner-2-13-1024x576.jpg' fluid alt='...' hegiht="350" width="450"/>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle textAlign="center">Weight Lifting</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </MDBCardText>
        </MDBCardBody>
        <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
          <MDBCardImage src='https://s3.us-west-1.amazonaws.com/contentlab.studiod/getty/45197446e3464bb99a3e6c05332db502.jpg' fluid alt='...' hegiht="350" width="450"/>
        </MDBRipple>
        <MDBCardBody>
          <MDBCardTitle textAlign="center">Stair Case</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    );
}

export default Service;


/*
import {
    Box,
    Typography,
  } from '@mui/material';
  const Service = () => {
return (
        <Box
        display="flex"
        flexDirection={'row'}
        marginTop="0.2%"
        backgroundColor="#d7e7d8"
        p={5}
        borderRadius={20}
        width="100%"
        marginLeft={'0%'}
        height="100%">
            <h2>Services</h2>
            <Box>
                <Typography
                    sx={{
                    textAlign: 'left',
                    p: 3,
                    gridRowStart: 1,
                    gridAutoColumns: 3,
                    fontWeight: 'bold',
                    fontSize: '20px',
                 }}>
                    <Box>
                    <img src="https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg" 
                    height="250" width="400" alt='Card Services'/>
                    <Typography>Threadmill</Typography>
                    </Box>
                    <Box>
                    <img src="https://fitpage.in/wp-content/uploads/2021/11/Article_Banner-2-13-1024x576.jpg" 
                    height="250" width="400" alt='Card Services'/>
                    <Typography>Weight Lifting</Typography>
                    </Box>
                    <Box>
                    <img src="https://www.liberty.edu/campusrec/reccenters/wp-content/uploads/sites/13/2020/04/bruno-nascimento-PHIgYUGQPvU-unsplash-1024x683.jpg" 
                    height="250" width="400" alt='Card Services'/>
                    <Typography>Stair Case</Typography>
                    </Box>
                </Typography>
            </Box>
        </Box>
);
};

export default Service;*/
