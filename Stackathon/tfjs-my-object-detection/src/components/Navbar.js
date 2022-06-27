import React, {useState} from 'react'
import {Grid, AppBar, Toolbar, Typography, Tabs, Tab, Box, Button } from '@material-ui/core'
import { TabPanel, TabContext} from '@material-ui/lab';
import loadingLogo from "../../src/loadingPhoto.gif"
import AboutUs from './AboutUs';

function Navbar() {
  const [value, setValue] = useState(0);

  return (
    <div>
    <AppBar className = 'appbar'>
      <Toolbar>
      <Grid sx= {{placeItems: 'center'}}container >
        <Grid item xs={2}>
          <Typography>
          <img className = 'navbar-logo'src={loadingLogo} alt='loadingLogo'/>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <TabContext value={value} onChange={(e, val) => {setValue(val)}}>
          <Tabs centered indicator = 'secondary' textColor='inherit' value = {value} onChange={(e, val) => {setValue(val)}}>
            <Tab label='Test it Out!' />
          </Tabs>
          </TabContext>
        </Grid>
        <Grid item xs={1}/>
        <Button variant="contained" href='/about' centered>About advCaptcha</Button>
      </Grid>
      </Toolbar>
    </AppBar>
   </div>
  )
}

export default Navbar
