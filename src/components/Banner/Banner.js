import React from 'react';
import { Container, Typography } from '@mui/material';
import './Banner.css';
import Carousel from './Carousel';


const Banner = () => {

  return (
    <div >
      <Container >
        <div className='tagline'>
          <Typography variant='h2' style={{
            fontWeight: "bold",
            marginBottom: 15,
            marginTop:50,
            
            fontFamily: "Montserrat"
            ,
          }}>
            Crypto App
          </Typography>
          <Typography variant='subtitle2' style={{
            color: "darkgrey",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
          }}>
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel/>
      </Container>
    </div>
  )
}

export default Banner;
