import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { fontWeight } from '@mui/system'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
    title : {
        color : 'yellow',
        fontWeight: "bold",
    }
})



const Header = () => {
const history = useHistory();
    const classes = useStyles()
    return (
       <AppBar position="static" color="transparent">
         <Container>
             <Toolbar>
                <Typography onClick={() => history.push(`/`)} style={{fontWeight: "bold" , fontFamily: "Montserrat"}} className={classes.title}>
                    Crypto Tracker
                </Typography>
             </Toolbar>
         </Container>
       </AppBar>
    )
}

export default Header
