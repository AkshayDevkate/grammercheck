import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

// React say to listen text

import { SayButton } from 'react-say';


//Mui text Field
import TextField from '@mui/material/TextField';


import {  GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

import { useState } from 'react';

// speech recoginition
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Accordion = styled((props: AccordionProps) => (
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

const AccordionSummary = styled((props: AccordionSummaryProps) => (
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




export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');

  const [name, setName] = useState("")
  const [name2, setName2] = useState("")

  const [listen, setListen] = useState("") 

  const [email, setEmail] = useState('');

  // next button accordion 2 and 3
  const nextChange = () => {
    setExpanded(expanded + 1 )
  }

  // Next Button accordion 1
  async function display(){
    console.log('something is changed');
    console.log(name2)
    setName(transcript)
    setExpanded(expanded + 1 )
  }



  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

    const [anchorEl, setAnchorEl] = React.useState({
      value: 0,
      anchorEl: null,
      popno: -1
    });

    const handleChangeP = (event, value) => {
      setAnchorEl(anchorEl.value);
    };

    // Speech recognition 
    const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();
  
    if (!browserSupportsSpeechRecognition) {
      return <span>Browser doesn't support speech recognition.</span>;
    }
  

    // next button drop down 1
     async function display(){
      console.log('something is changed');
  
      console.log(name2)
      setName(transcript)

      setExpanded(expanded + 1 )
  
    }


    const handleClickEmail = event => {
      setEmail(event.target.value);
    };



  

  return (

  
    <div>
{/* =============== Drop Down 1 ================= */}

        <Accordion expanded={expanded === 1} onChange={handleChange(1)} >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" >
        <Typography>Step 1: Speak</Typography>
      </AccordionSummary>
      <AccordionDetails >
        <Typography value={anchorEl.value} onChange={handleChangeP}>
          <div align="center">
        {/* Speech to Text - https://www.npmjs.com/package/react-speech-recognition*/}
          <p>Microphone: {listening ? 'on' : 'off'}</p>
                <button onClick={SpeechRecognition.startListening}>Start</button>
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>
                <p>{transcript}</p>
                <br/><br/>
                <p><label>Enter Email Address</label>
                <input type= 'text' value={email}
            onChange={handleClickEmail}/>
                *</p> 

                <button variant="contained" color='success' expanded={expanded === 2} onClick={display}>
                   Continue
                </button>
          </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

{/* ================== Drop Down 2 ==================== */}

      <Accordion expanded={expanded === 2} onChange={handleChange(2)}>
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <Typography>Step: 2: Correct</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>

<div>
  <p align="center">
  {/*  When you provide default value of asynchrounous speak to text as input to the grammerly the text will not be able to edit */}
        <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  defaultValue={name}
                />
    </p>
<p align='center'>
<> Copy the above text to below ** ↓ ** to make it correct using Grammerly API</>
</p>

<p align='center'>
{/*  Grammerly API to correct the text - https://developer.grammarly.com/docs/
 If you copy and paste the text into this text field grammerly allows to edit it*/}
    <GrammarlyEditorPlugin clientId="client_VnGHunVqY1HWNpMXAgmGc3">
      <textarea ></textarea>     
    </GrammarlyEditorPlugin>
</p>

<p align='center'>
  <>After correcting the text copy it below ** ↓ **  to listen the corrected text </>
</p>
<p align='center'>
        <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                
                />
</p> 


<button variant="contained" color='success' expanded={expanded === 'panel2'} onClick={nextChange}>
        Continue to listen
      </button>

</div>
</Typography>
          
          
{/* ====================== Drop Down 3 ======================= */}

        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 3} onChange={handleChange(3)}>
      <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
        <Typography>Step: 3: Listen</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
        
        <SayButton
    onClick={ event => console.log(event) }
    speak={name}
  >
    Listen to corrected text
  </SayButton>

        <button variant="contained" color='success' expanded={expanded === 'panel2'} onClick={nextChange}>
       End
      </button>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
