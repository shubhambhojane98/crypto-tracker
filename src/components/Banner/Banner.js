import { Container, Typography } from '@mui/material'
import React from 'react'
import './Banner.css'
import Carousel from './Carousel'

const Banner = () => {
    return (
        <div className="banner">
            <Container className="bannercontent">
                <div className="tagline">
                <Typography style={{color:'yellow', fontSize:"3rem"}}>
                    Crypto Tracker
                </Typography>
                <Typography style={{color : 'grey',fontSize: "2rem"}}>
                Get all the Info regarding your favorite Crypto Currency
                </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner
