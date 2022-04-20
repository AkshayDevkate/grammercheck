import * as React from 'react';

import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

//Second Tab
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//Autocomplete 
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

//Weiter Button 
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

//Text Field
import Box from '@mui/material/Box';

//Slider 
import Slider from '@mui/material/Slider';

//Result Table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Axios 
import Axios from  "axios";
import { useState } from "react";




//Postal codes
const options = [ 'abcd', 'abcd']

// drop down
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// Slider 2
const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

// Result Table 
function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}
const rows = [
  createData('Installation Firm 1', 'Price A', '***', 'Available'),
  createData('Installation Firm 2', 'Price B','****','Not Available'),
  createData('Installation Firm 3', 'Price C','*','Not Available'),
 
];


//All state and new state variables
function UserForm() {
  const [expanded, setExpanded] = React.useState('panel1');

  //Declare a new state variable, which we'll call "count"
  const [city, setCity] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  
  //electricty usage 
  const [usage, setUsage] = React.useState('');

  //wallbox
  const [wallbox, setWallbox] = React.useState('');
  //battery
  const [battery, setBattery] = React.useState('');
  //year 
  const [year, setYear] = React.useState('');

  //Random 3 prices 
  const [price, setPrice] =  React.useState(0);
  const [price1, setPrice1] = React.useState(0);
  const [price2, setPrice2] = React.useState(0);

  //variables for calculation functions module & size 
  const [module, setModule] = React.useState(0);
  const [size, setSize] = React.useState(0);

  //Height and breadth step 5
  const [hohe, setHohe] = React.useState(0);
  const [breite, setBreite] = React.useState(0);
  const [rent, setRent] = React.useState(0);

  //Installation firms 
  const [employeeList, setEmployeelist] = useState([]);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  
// Handle changes function 
  const handleSelectChange = (event) => {
    setUsage(event.target.value);
    
  };

  const handleSize = (event) =>{
    setSize(event.target.value);
  } ;

  const handleModule = (event) =>{
    setModule(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleBattery =(event) => {
    setBattery(event.target.value);   
  };

  const handleWallbox =(event) => {
    setWallbox(event.target.value);
  };

  const handleHohe =(event) => {
    setHohe(event.target.value);
  };

  const handleBreite =(event) => {
    setBreite(event.target.value);
  };

  //Calculating the price 
  const handlePrice = () => {
    if (module ===  0) {
      setModule( size/ 1.7)
    }
    
    setRent(hohe * breite * 20)

  // battery = yes 
    if (battery === 0){  
      if (wallbox === 0) // wallbox = yes 
      {
        if (year === 20)
        {
          setPrice(module * 0.37 * 2400 +2000 +  rent + 800 )
          setPrice1(module * 0.37 * 2600 +2000 + rent + 800 )
          setPrice2(module * 0.37 * 2800 +2000 + rent + 800)
        }
        if (year === 30)
        {
          setPrice(module * 0.37 * 2400 +2000 +  rent + 1500 )
          setPrice1(module * 0.37 * 2600 +2000 + rent + 1500 )
          setPrice2(module * 0.37 * 2800 +2000 + rent + 1500 )
        }
        if (year === 40)
        {
          setPrice(module * 0.37 * 2400 +2000 +  rent + 2500 )
          setPrice1(module * 0.37 * 2600 +2000 + rent + 2500 )
          setPrice2(module * 0.37 * 2800 +2000 + rent + 2500 )
        } 
      }
      if (wallbox === 1){ //wallbox = no
        if (year === 20 ){
          setPrice(module * 0.37 * 240 + rent + 800)
          setPrice1(module * 0.37 * 2600 + rent + 800)
          setPrice2(module * 0.37 * 2800 + rent + 800)
        }
        if (year === 30 ){
          setPrice(module * 0.37 * 240 + rent + 1500)
          setPrice1(module * 0.37 * 2600 + rent + 1500)
          setPrice2(module * 0.37 * 2800 + rent + 1500)
        }
        if (year === 40 ){
          setPrice(module * 0.37 * 240 + rent + 2500)
          setPrice1(module * 0.37 * 2600 + rent + 2500)
          setPrice2(module * 0.37 * 2800 + rent + 2500)
        }
      }
    }

    // if battery = no
    if (battery=== 1){
      if (wallbox === 0){ // wallbox = yes 
        if (year === 20)  
         { // year more than 10
          setPrice(module * 0.37 *1400 + 2000 + rent + 800)
          setPrice1(module * 0.37 *1600 + 2000 + rent + 800)
          setPrice2(module * 0.37 *1800 + 2000 + rent + 800)
        }
        if (year === 30)
         { // year more than 20
          setPrice(module * 0.37 *1400 + 2000 + rent + 1500)
          setPrice1(module * 0.37 *1600 + 2000 + rent + 1500)
          setPrice2(module * 0.37 *1800 + 2000 + rent + 1500)
        }
        if (year === 40)
        { // year more than 30
         setPrice(module * 0.37 *1400 + 2000 + rent + 2500)
         setPrice1(module * 0.37 *1600 + 2000 + rent + 2500)
         setPrice2(module * 0.37 *1800 + 2000 + rent + 2500)
       }
        
      }
      if (wallbox === 1){ // wallbox = no 
        if (year === 20){
          setPrice(module * 0.37 * 1400 + rent + 800)
          setPrice1(module * 0.37 *1600 + rent + 800)
          setPrice2(module * 0.37 *1800  + rent + 800)
        }
        if (year === 30){
          setPrice(module * 0.37 * 1400 + rent + 1500)
          setPrice1(module * 0.37 *1600 + rent + 1500)
          setPrice2(module * 0.37 *1800  + rent + 1500)
        }
        if (year === 40){
          setPrice(module * 0.37 * 1400 + rent + 2500)
          setPrice1(module * 0.37 *1600 + rent + 2500)
          setPrice2(module * 0.37 *1800  + rent + 2500)
        }
       
      }
    }
    
  }  


  // Recieving data from the server 
const getEmployee = () => {
  console.log("Button tapped")


  //Receiving the data from the sql server  
  Axios.get("http://localhost:3002/employee").then((response) => {
    setEmployeelist(response.data)
console.log(response.data)
  
     employeeList.map((val, key) => {
      return <div> {val.firm}{val.wYes + 1}</div>;
    })
});
}

  return (
<>
<div id="footer">
    <div>
{/* +++++++++++++++++++++++++++++++++++++++++Drop Down one ++++++++++++++++++++++++++++++++++++++++++++++++++++++*/}         
    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography>Step: 1 Platz</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          
     
{/* Select city */} 
<div>
     
      <br />
      <h3>Wo wohnen sie</h3>
      <Autocomplete
        value={city}
        onChange={(event, newValue) => {
          setCity(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Stadt / Platz" />}
      />
    </div>


    <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={handleChange('panel3')}>
        Weiter
      </Button>

        </Typography>
      </AccordionDetails>
    </Accordion>


{/* ++++++++++++++++++++++++++++++++++++Drop Down two +++++++++++++++++++++++++++++++++++++=*/} 
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography>Step: 2  Usage</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
      

    {/* electricity usage */} 
        <p> Wie hoch ist ihr Jahresverbrauch?</p>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Wie hoch ist ihr Jahresverbrauch?</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={usage}
          label="*"
        onChange={handleSelectChange}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>bis 2500 KWh (1-2 Personen)</MenuItem>
          <MenuItem value={20}>bis 4000 KWh (3-4 Personen)</MenuItem>
          <MenuItem value={30}>bis 6000 KWh (5-6 Personen)</MenuItem>
          <MenuItem value={40}>mehr als 6,000 KWh</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={handleChange('panel3')}>
        Weiter
      </Button>

        </Typography>
      </AccordionDetails>
    </Accordion>



{/* +++++++++++++++++++++++++++++++++++++++++++Drop Down three ++++++++++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step: 3 Wallbox</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
       

       {/* Wallbox */} 
        <p> Wollen Sie einen Wallbox installieren ?</p>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Wallbox</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={wallbox}
          label=""
          onChange={handleWallbox}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={0}>Ja, gerne</MenuItem>
          <MenuItem value={1}>Nein, danke</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>

      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={handleChange('panel3')}>
        Weiter
      </Button>

        </Typography>
      </AccordionDetails>
    </Accordion>


{/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ Drop Down Four ++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step : 4 Battery</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  


       {/* battery */} 
        <p> Wollen Sie einen Batteriespeicher installieren ?</p>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Battery</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={battery}
          label=""
          onChange={handleBattery}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={0}>Ja, gerne</MenuItem>
          <MenuItem value={1}>Nein, danke</MenuItem>
        </Select>
        <FormHelperText>Required*</FormHelperText>
      </FormControl>
      

      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel2'} onClick={handleChange('panel3')}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>


    {/* +++++++++++++++++++++++++++++++++++++++++++++++++Drop Down Five+++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 5: Fassade</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  


    {/* Fassade */} 
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="Hohe" 
      value={hohe}
      onChange={handleHohe}
      variant="outlined" />

      <TextField 
      id="outlined-basic" 
      label="Breite" 
      value={breite}
      onChange={handleBreite}
      variant="outlined" />

    
    </Box>
       
    {/* Stromzahler dropdown */} 
       <h2>Wie alt ist ihr Stromzähler</h2>
        
        <p> Wie alt ist Ihr Stromzähler?</p>
        {/* Drop Down two */} 
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">dropdown</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={year}
          label=""
          onChange={handleYear}
        >
          <MenuItem value="">
          </MenuItem>
          <MenuItem value={10}>Unter 10 Jahre</MenuItem>
          <MenuItem value={20}>Mehr als 10 Jahre</MenuItem>
          <MenuItem value={20}>Mehr als 20 Jahre</MenuItem>
          <MenuItem value={20}>Mehr als 30 Jahre</MenuItem>

        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel6'}  onClick={handleChange('panel6')}>
        Weiter
      </Button>
        </Typography>
      </AccordionDetails>
    </Accordion>


    {/* ++++++++++++++++++++++++++++++++++++++++++++++Drop Down six +++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 6: Module or size</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  


      {/* solar panel and meters */} 
      
      <h2> Wie viele Module passen maximal auf ihr Dach</h2>
      
       <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

    {/* solar panel and meters */}   

      <TextField 
      id="outlined-basic" 
      label="module" 
      value={module}
      onChange={handleModule}
      variant="outlined" />


      <TextField 
      id="" 
      label="Size" 
      value={size}
      onChange={handleSize}
      variant="outlined" />
    </Box>
      

      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={handleChange('panel6')}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>


    
    {/* ++++++++++++++++++++++++++++Drop Down seven +++++++++++++++++++++++++++++++++++++++++++ */} 
    <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 7: Anzahl module</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  
    
     
      

    {/* Slider 2*/}

    <Box sx={{ m: 3 }} />
      <Typography gutterBottom>Wahlen Sie die Anzahl Module</Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={module}
      />


    <Button onClick={getEmployee}>Calulate</Button>

 
    
  
        
      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={handleChange('panel6')}>
        Angebot anzelgen
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>



 {/* ++++++++++++++++++++++++++++++++++++++++++++++++Drop Down Eight +++++++++++++++++++++++++++++++++++++++++++ */} 
 <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 8: Results</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  


      {/* Result Table */}
        { employeeList.map((val, key) => {
      console.log(val.firm)
{/* Result Test Start */}


{/*======================================= Battery yes ================================================*/}
if ( battery === 0) {
  {/* Wallbox yes */}
    if (wallbox === 0) {
      {/* Usage 1 */}    
          if (usage === 10) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 10){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work100))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 20) {
                        {/* Dividing based on modules */}      
                                if (module <= 10){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.sttwo + (module * val.work100))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stthree + (module * val.work100))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work20))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work50))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stfour + (module * val.work100))}</>
                          </div>
                          </div>)
                        }

              }
          }
    {/* Usage 2 */}    
            if (usage === 10) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module < 10){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stone + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (<div className="employee">
                                      <div>
                                        <h3>Firm: {val.firm}</h3>
                                        <h3>Branch: {val.branch}</h3>
                                        <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                        <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work10))}</>
                                      </div>
                                      </div>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work20))}</>
                                    </div>
                                    </div>)
                            }
                                if (module > 20 && module <=50){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work50))}</>
                                  </div>
                                  </div>)
                                }
                              if (module > 50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.sttwo + (module * val.work100))}</>
                                </div>
                                </div>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+val.byestwo  + val.stthree + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stfour + (module * val.work100))}</>
                            </div>
                            </div>)
                          }
  
                }
      }
            {/* Usage 3 */}    
            if (usage === 30) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stone + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (<div className="employee">
                                      <div>
                                        <h3>Firm: {val.firm}</h3>
                                        <h3>Branch: {val.branch}</h3>
                                        <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                        <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work10))}</>
                                      </div>
                                      </div>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work20))}</>
                                    </div>
                                    </div>)
                            }
                                if (module > 20 && module <=50){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work50))}</>
                                  </div>
                                  </div>)
                                }
                              if (module > 50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.sttwo + (module * val.work100))}</>
                                </div>
                                </div>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stthree + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stthree + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree  + val.stfour + (module * val.work100))}</>
                            </div>
                            </div>)
                          }
  
                }  
              }
            {/* Usage 4 */}    
            if (usage === 40) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (<div className="employee">
                                      <div>
                                        <h3>Firm: {val.firm}</h3>
                                        <h3>Branch: {val.branch}</h3>
                                        <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                        <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work10))}</>
                                      </div>
                                      </div>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work20))}</>
                                    </div>
                                    </div>)
                            }
                                if (module > 20 && module <=50){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.sttwo + (module * val.work50))}</>
                                  </div>
                                  </div>)
                                }
                              if (module > 50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.sttwo + (module * val.work100))}</>
                                </div>
                                </div>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stthree + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stthree + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stthree + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stthree + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stfour + (module * val.work100))}</>
                            </div>
                            </div>)
                          }
  
                }
      }


  }


  {/* Wallbox No */}
  if (wallbox === 1) {
    {/* Usage 1 */}    
        if (usage === 10) {
          {/* Year 1 */}    
                if (year === 10) {
                   {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

            }
             {/* Year 2 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 3 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }
                {/* Year 4 */}   
                if (year === 10) {
                  {/* Dividing based on modules */}      
                          if (module <= 15){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                          }
                          if (module > 10 && module <= 20){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                    }
                        if (module > 20 && module <=50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }
                      if (module > 50){
                        return   (<div className="employee">
                        <div>
                          <h3>Firm: {val.firm}</h3>
                          <h3>Branch: {val.branch}</h3>
                          <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                          <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesone + val.stone + (module * val.work10))}</>
                        </div>
                        </div>)
                      }

            }
        }
  {/* Usage 2 */}    
          if (usage === 10) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo+ val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+val.byestwo + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }
    }
          {/* Usage 3 */}    
          if (usage === 30) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+val.byesthree+ val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree+ val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+val.byesthree + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesthree + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }  
            }
          {/* Usage 4 */}    
          if (usage === 40) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour+ val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byesfour + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }
    }


}
  
}


{/*======================================= Battery NO ===========================================*/}

if ( battery === 1) {
  {/* Wallbox yes */}
    if (wallbox === 0) {
      {/* Usage 1 */}    
          if (usage === 10) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 10){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stone + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work100))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 20) {
                        {/* Dividing based on modules */}      
                                if (module <= 10){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work100))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work100))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work20))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work50))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work100))}</>
                          </div>
                          </div>)
                        }

              }
          }
    {/* Usage 2 */}    
            if (usage === 10) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module < 10){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stone + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stone + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (<div className="employee">
                                      <div>
                                        <h3>Firm: {val.firm}</h3>
                                        <h3>Branch: {val.branch}</h3>
                                        <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                        <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work10))}</>
                                      </div>
                                      </div>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.sttwo + (module * val.work20))}</>
                                    </div>
                                    </div>)
                            }
                                if (module > 20 && module <=50){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work50))}</>
                                  </div>
                                  </div>)
                                }
                              if (module > 50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work100))}</>
                                </div>
                                </div>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+val.bno + val.stthree + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.byestwo  + val.stthree + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stfour + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work100))}</>
                            </div>
                            </div>)
                          }
  
                }
      }
            {/* Usage 3 */}    
            if (usage === 30) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stone + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (<div className="employee">
                                      <div>
                                        <h3>Firm: {val.firm}</h3>
                                        <h3>Branch: {val.branch}</h3>
                                        <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                        <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work10))}</>
                                      </div>
                                      </div>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work20))}</>
                                    </div>
                                    </div>)
                            }
                                if (module > 20 && module <=50){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work50))}</>
                                  </div>
                                  </div>)
                                }
                              if (module > 50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.sttwo + (module * val.work100))}</>
                                </div>
                                </div>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stthree + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stthree + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stfour + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno  + val.stfour + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work100))}</>
                            </div>
                            </div>)
                          }
  
                }  
              }
            {/* Usage 4 */}    
            if (usage === 40) {
              {/* Year 1 */}    
                    if (year === 10) {
                       {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stone + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stone + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                }
                 {/* Year 2 */}   
                        if (year === 20) {
                          {/* Dividing based on modules */}      
                                  if (module <= 15){
                                      return   (<div className="employee">
                                      <div>
                                        <h3>Firm: {val.firm}</h3>
                                        <h3>Branch: {val.branch}</h3>
                                        <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                        <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work10))}</>
                                      </div>
                                      </div>)
                                  }
                                  if (module > 10 && module <= 20){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work20))}</>
                                    </div>
                                    </div>)
                            }
                                if (module > 20 && module <=50){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.sttwo + (module * val.work50))}</>
                                  </div>
                                  </div>)
                                }
                              if (module > 50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.sttwo + (module * val.work100))}</>
                                </div>
                                </div>)
                              }
  
                    }
                      {/* Year 3 */}   
                      if (year === 30) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stthree + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bnor + val.stthree + (module * val.work20))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stthree + (module * val.work50))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stthree + (module * val.work100))}</>
                              </div>
                              </div>)
                            }
  
                  }
                    {/* Year 4 */}   
                    if (year === 40) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work20))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stfour + (module * val.work50))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stfour + (module * val.work100))}</>
                            </div>
                            </div>)
                          }
  
                }
      }


  }


  {/* Wallbox No */}
  if (wallbox === 1) {
    {/* Usage 1 */}    
        if (usage === 10) {
          {/* Year 1 */}    
                if (year === 10) {
                   {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

            }
             {/* Year 2 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 3 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }
                {/* Year 4 */}   
                if (year === 10) {
                  {/* Dividing based on modules */}      
                          if (module <= 15){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                          }
                          if (module > 10 && module <= 20){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                    }
                        if (module > 20 && module <=50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }
                      if (module > 50){
                        return   (<div className="employee">
                        <div>
                          <h3>Firm: {val.firm}</h3>
                          <h3>Branch: {val.branch}</h3>
                          <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                          <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                        </div>
                        </div>)
                      }

            }
        }
  {/* Usage 2 */}    
          if (usage === 10) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.byestwo + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }
    }
          {/* Usage 3 */}    
          if (usage === 30) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wno+val.bno+ val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ vval.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno+ val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wno + val.bno+ val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }  
            }
          {/* Usage 4 */}    
          if (usage === 40) {
            {/* Year 1 */}    
                  if (year === 10) {
                     {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno + val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) +  val.wno + val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wno + val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

              }
               {/* Year 2 */}   
                      if (year === 10) {
                        {/* Dividing based on modules */}      
                                if (module <= 15){
                                    return   (<div className="employee">
                                    <div>
                                      <h3>Firm: {val.firm}</h3>
                                      <h3>Branch: {val.branch}</h3>
                                      <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                      <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                    </div>
                                    </div>)
                                }
                                if (module > 10 && module <= 20){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                          }
                              if (module > 20 && module <=50){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                              }
                            if (module > 50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }

                  }
                    {/* Year 3 */}   
                    if (year === 10) {
                      {/* Dividing based on modules */}      
                              if (module <= 15){
                                  return   (<div className="employee">
                                  <div>
                                    <h3>Firm: {val.firm}</h3>
                                    <h3>Branch: {val.branch}</h3>
                                    <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                    <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                  </div>
                                  </div>)
                              }
                              if (module > 10 && module <= 20){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                        }
                            if (module > 20 && module <=50){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                            }
                          if (module > 50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno+ val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }

                }
                  {/* Year 4 */}   
                  if (year === 10) {
                    {/* Dividing based on modules */}      
                            if (module <= 15){
                                return   (<div className="employee">
                                <div>
                                  <h3>Firm: {val.firm}</h3>
                                  <h3>Branch: {val.branch}</h3>
                                  <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                  <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                                </div>
                                </div>)
                            }
                            if (module > 10 && module <= 20){
                              return   (<div className="employee">
                              <div>
                                <h3>Firm: {val.firm}</h3>
                                <h3>Branch: {val.branch}</h3>
                                <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                                <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                              </div>
                              </div>)
                      }
                          if (module > 20 && module <=50){
                            return   (<div className="employee">
                            <div>
                              <h3>Firm: {val.firm}</h3>
                              <h3>Branch: {val.branch}</h3>
                              <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                              <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                            </div>
                            </div>)
                          }
                        if (module > 50){
                          return   (<div className="employee">
                          <div>
                            <h3>Firm: {val.firm}</h3>
                            <h3>Branch: {val.branch}</h3>
                            <h3>Price : { ( 0.37* (module * (val.modPrice + val.uc)) + val.wYes + val.byesone + val.stone + (module * val.work10))}</h3>
                            <>test: {((val.modPrice * module) + (val.uc * module) + val.wyes+ val.bno + val.stone + (module * val.work10))}</>
                          </div>
                          </div>)
                        }

              }
    }


}
  
}

    })}


      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={handleChange('panel6')}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>


  {/* +++++++++++++++++++++++++++++++++++++++++Drop Down Nine +++++++++++++++++++++++++++++++++++++++++++ */} 
 <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step 9: Contact Page</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>  

       
            <TextField
              placeholder="Name"
              label="Name"
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="E-mail"
              label="E-mail"
              margin="normal"
              fullWidth
              required
            />
            <br />
            <TextField
              placeholder="Phone Number"
              label="Phone"
              margin="normal"
              fullWidth
              required
            />
            <br />
        
      

      <Button variant="contained" endIcon={<SendIcon />} expanded={expanded === 'panel6'} onClick={handleChange('panel6')}>
        Weiter
      </Button>


        </Typography>
      </AccordionDetails>
    </Accordion>

  </div>

  </div>
  
   </>
  );
}

export default UserForm;