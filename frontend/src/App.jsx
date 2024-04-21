import { Alert, Container, FormControl, Icon, Input, InputLabel, MenuItem, Select, Snackbar, Stack, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import axios from 'axios';
import Papa from "papaparse";
function App() {
  const [minTemp, setMinTemp] = useState(7.1);
  const [maxTemp, setMaxTemp] = useState(13.0);
  const [rainfall, setRainfall] = useState(8.8);
  const [windGustDirection, setWindGustDirection] = useState("N");
  const [windGustSpeed, setWindGustSpeed] = useState(41.0);
  const [windDirection9am, setWindDirection9am] = useState("N");
  const [windDirection3pm, setWindDirection3pm] = useState("WNW");
  const [windSpeed9am, setWindSpeed9am] = useState(24.0);
  const [windSpeed3pm, setWindSpeed3pm] = useState(22.0);
  const [humidity9am, setHumidity9am] = useState(100.0);
  const [humidity3pm, setHumidity3pm] = useState(98.0);
  const [pressure9am, setPressure9am] = useState(1001.7);
  const [pressure3pm, setPressure3pm] = useState(1005.4);
  const [cloud9am, setCloud9am] = useState(8.0);
  const [cloud3pm, setCloud3pm] = useState(8.0);
  const [temp9am, setTemp9am] = useState(8.6);
  const [temp3pm, setTemp3pm] = useState(11.5);
  const [rainToday, setRainToday] = useState("No");
  const [predict, setPredict] = useState("Yes")

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const sendPredict = async()=>{
    const params = new URLSearchParams({
      MinTemp : minTemp,
      MaxTemp : maxTemp,
      Rainfall : rainfall,
      WindGustDir : windGustDirection,
      WindGustSpeed : windGustSpeed,
      WindDir9am : windDirection9am,
      WindDir3pm : windDirection3pm,
      WindSpeed9am : windSpeed9am,
      WindSpeed3pm : windSpeed3pm,
      Humidity9am : humidity9am,
      Humidity3pm : humidity3pm,
      Pressure9am : pressure9am,
      Pressure3pm : pressure3pm,
      Cloud9am : cloud9am,
      Cloud3pm : cloud3pm,
      Temp9am : temp9am,
      Temp3pm : temp3pm,
      RainToday: rainToday
    });
    try { 
      const result = await axios.get("http://localhost:5000/predict?"+params.toString(),
      { 
        headers:{ 
          "Content-Type":"application/json"
        },
      })
      setPredict(result.data.prediction)
      setOpen(true)
    } catch (error) {
      console.log(error)
    }
  }
  const changeHandlerCSV = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const res = results.data[0]
        setMinTemp(res.MinTemp)
        setMaxTemp(res.MaxTemp)
        setRainfall(res.Rainfall)
        setWindGustDirection(res.WindGustDir)
        setWindGustSpeed(res.WindGustSpeed)
        setWindDirection9am(res.WindDir9am)
        setWindDirection3pm(res.WindDir3pm)
        setWindSpeed9am(res.WindSpeed9am)
        setWindSpeed3pm(res.WindSpeed3pm)
        setHumidity9am(res.Humidity9am)
        setHumidity3pm(res.Humidity3pm)
        setPressure9am(res.Pressure9am)
        setPressure3pm(res.Pressure3pm)
        setCloud9am(res.Cloud9am)
        setCloud3pm(res.Cloud3pm)
        setTemp9am(res.Temp9am)
        setTemp3pm(res.Temp3pm)
        setRainToday(res.RainToday)
      },
    })
  };
  return (
    <>
    <Typography variant="h5">Weather Prediction</Typography>
    <div style={{width:"100%", display:"flex"}}>
      <div style={{marginLeft:"auto", marginRight:"auto"}}>
      {predict==="No" ? <>
      <WbSunnyIcon style={{fontSize:"80px"}}/>
        <Typography variant="h5" style={{textAlign:"center"}}>Sunny</Typography>
      </> : <>
      <ThunderstormIcon style={{fontSize:"80px"}}/>
        <Typography variant="h5" style={{textAlign:"center"}}>Rainy</Typography>
      </>} 
      </div>
    </div>
    <Typography variant="h5" style={{marginTop:"20px"}}>Weather Information</Typography>
    <Stack style={{border:"1px solid blue", padding:"10px", borderRadius:"6px"}}>
      <Typography>CSV</Typography>
      <input type="file" accept='.csv' 
        onChange={changeHandlerCSV} style={{ marginBottom:"10px", marginTop:"5px"}} />
    </Stack>
    <Stack direction={{ xs: 'column', sm: 'row' }} style={{marginTop:"10px"}}>
         <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Minimum Temperature" variant="outlined" value={minTemp} step={0.1} onChange={(e)=>{setMinTemp(e.target.value)}} />
         </Container>
         <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Maximum Temperature" variant="outlined" value={maxTemp} step={0.1} onChange={(e)=>{setMaxTemp(e.target.value)}} />
         </Container>
         <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Rainfall" variant="outlined" value={rainfall} step={0.1} onChange={(e)=>{setRainfall(e.target.value)}} />
         </Container>
         <Container>
         <FormControl fullWidth>
            <InputLabel>Wind Gust Direction</InputLabel>
            <Select 
              value={windGustDirection}
              onChange={(e)=>{setWindGustDirection(e.target.value)}}
            > 
              <MenuItem value="W">W</MenuItem>
              <MenuItem value="WNW">WNW</MenuItem>
              <MenuItem value="WSW">WSW</MenuItem>
              <MenuItem value="NE">NE</MenuItem>
              <MenuItem value="NNW">NNW</MenuItem>
              <MenuItem value="N">N</MenuItem>
              <MenuItem value="NNE">NNE</MenuItem>
              <MenuItem value="SW">SW</MenuItem>
              <MenuItem value="ENE">ENE</MenuItem>
              <MenuItem value="SSE">SSE</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="NW">NW</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="ESE">ESE</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="SSW">SSW</MenuItem> 
            </Select>
          </FormControl>
         </Container>
         <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Wind Gust Speed" variant="outlined" value={windGustSpeed} step={0.1} onChange={(e)=>{setWindGustSpeed(e.target.value)}}/>
         </Container>
         
         <Container>
         <FormControl fullWidth>
            <InputLabel>Wind Direction 9 AM</InputLabel>
            <Select 
              value={windDirection9am}
              onChange={(e)=>{setWindDirection9am(e.target.value)}}
            >
              <MenuItem value="W">W</MenuItem>
              <MenuItem value="WNW">WNW</MenuItem>
              <MenuItem value="WSW">WSW</MenuItem>
              <MenuItem value="NE">NE</MenuItem>
              <MenuItem value="NNW">NNW</MenuItem>
              <MenuItem value="N">N</MenuItem>
              <MenuItem value="NNE">NNE</MenuItem>
              <MenuItem value="SW">SW</MenuItem>
              <MenuItem value="ENE">ENE</MenuItem>
              <MenuItem value="SSE">SSE</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="NW">NW</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="ESE">ESE</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="SSW">SSW</MenuItem> 
            </Select>
          </FormControl>
         </Container>
         <Container>
         <FormControl fullWidth>
            <InputLabel>Wind Direction 3PM</InputLabel>
            <Select 
              value={windDirection3pm}
              onChange={(e)=>{setWindDirection3pm(e.target.value)}}
            >
              <MenuItem value="W">W</MenuItem>
              <MenuItem value="WNW">WNW</MenuItem>
              <MenuItem value="WSW">WSW</MenuItem>
              <MenuItem value="NE">NE</MenuItem>
              <MenuItem value="NNW">NNW</MenuItem>
              <MenuItem value="N">N</MenuItem>
              <MenuItem value="NNE">NNE</MenuItem>
              <MenuItem value="SW">SW</MenuItem>
              <MenuItem value="ENE">ENE</MenuItem>
              <MenuItem value="SSE">SSE</MenuItem>
              <MenuItem value="S">S</MenuItem>
              <MenuItem value="NW">NW</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="ESE">ESE</MenuItem>
              <MenuItem value="E">E</MenuItem>
              <MenuItem value="SSW">SSW</MenuItem> 
            </Select>
          </FormControl>
         </Container>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} style={{marginTop:"10px"}}>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Wind Speed 9am" variant="outlined" value={windSpeed9am} step={0.1} onChange={(e)=>{setWindSpeed9am(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Wind Speed 3pm" variant="outlined" value={windSpeed3pm} step={0.1} onChange={(e)=>{setWindSpeed3pm(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Humidity 9am" variant="outlined" value={humidity9am} step={0.1} onChange={(e)=>{setHumidity9am(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Humidity 3pm" variant="outlined" value={humidity3pm} step={0.1} onChange={(e)=>{setHumidity3pm(e.target.value)}} />
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Pressure 9am" variant="outlined" value={pressure9am} step={0.1} onChange={(e)=>{setPressure9am(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Pressure 3pm" variant="outlined" value={pressure3pm} step={0.1} onChange={(e)=>{setPressure3pm(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Cloud 9am" variant="outlined" value={cloud9am} step={0.1} onChange={(e)=>{setCloud9am(e.target.value)}} />
        </Container>
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} style={{marginTop:"10px"}}>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Cloud 3pm" variant="outlined" value={cloud3pm} step={0.1} onChange={(e)=>{setCloud3pm(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Temp 9am" variant="outlined" value={temp9am} step={0.1} onChange={(e)=>{setTemp9am(e.target.value)}}/>
        </Container>
        <Container>
          <TextField fullWidth id="outlined-basic" type="number" label="Temp 3pm" variant="outlined" value={temp3pm} step={0.1} onChange={(e)=>{setTemp3pm(e.target.value)}}/>
        </Container>
        <Container>
         <FormControl fullWidth>
            <InputLabel>Rain Today</InputLabel>
            <Select 
              value={rainToday}
              onChange={(e)=>{setRainToday(e.target.value)}}
            >
              <MenuItem value={"Yes"}>Yes</MenuItem>
              <MenuItem value={"No"}>No</MenuItem> 
            </Select>
          </FormControl>
         </Container>
      </Stack>
      <Button variant="contained" fullWidth style={{marginTop:"15px"}} onClick={sendPredict}>Predict</Button>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
         Prediction Success!
        </Alert>
      </Snackbar>
    </>
  )
}

export default App
