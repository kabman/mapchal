import React, { useState,useEffect } from 'react';
import Map from './components/Map/Map';
import {Grid} from '@material-ui/core';
import axios from 'axios';

const App = () =>{
  const [locInfo,setLocInfo] = useState({start:"",end:""});
  const [coords, setCoords] = useState({});
  const[ans,setAns] = useState({});
  const [show, toggleShow] = useState(false);

  console.log(ans)
  const token = "9d3503e0-7236-4e47-a62f-8b01b5646c16";



  const addLocs = (event) =>{
    event.preventDefault()
  }

  const handleStartLoc = (event) => {
    setLocInfo({...locInfo,start:event.target.value})
  }

  const handleEndLoc = (event) => {
    setLocInfo({...locInfo,end:event.target.value})
  }
  const handleReset = () => {
    setLocInfo({start:"",end:""})
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const data = { "origin": locInfo.start, "destination":locInfo.end};
    axios.get(`https://mock-api.dev.lalamove.com/route/${token}`, data)
    .then(response => setAns(response.data));}, [locInfo.start,locInfo.end]);
  

  return(
    <>
      <Grid container spacing = {3} style={{width:"100%"}}>
        <Grid item xs={12} md={4}>
            <form onSubmit = {addLocs}>
              <div>
                starting location <br/><br/>
                <input type = "text" value = {locInfo.start} onChange = {handleStartLoc}/><br/><br/>
                Drop-off point<br/><br/>
                <input type = "text" value = {locInfo.end} onChange = {handleEndLoc}/><br/>
              </div>
              <br/>
              <div onSubmit={() => toggleShow(!show)}>
                total distance: {show ? ans.total_distance: null}<br/>
                total time: {show ? ans.total_time : null}
              </div>
              <div>
                <button type = "submit">Submit</button>
                <button onClick = {handleReset}>Reset</button>
              </div>
            </form>
        </Grid>
        <Grid item xs={12} md={8}>
        <Map
          setCoords={setCoords}
          coords={coords}
            
        />
        </Grid>
      </Grid>
      
      
    
    </>
    
  )
}

export default App;
