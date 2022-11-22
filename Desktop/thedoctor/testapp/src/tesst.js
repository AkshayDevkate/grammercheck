import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

import { useState } from 'react';

// React Mui Steps 
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


// grammerly api
import { Grammarly, GrammarlyEditorPlugin } from "@grammarly/editor-sdk-react";

import "./App.css";



function App() {

  const [name, setName] = useState("")
  const [name2, setName2] = useState("")


  const text = "";

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

   async function display(){
    console.log('something is changed');
    
    console.log(name2)
    setName(transcript)

  }



  // React Steps 
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());


  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  return (
    <div>

<div style="width: 20%; float:left">
<p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p>{transcript}</p>
    <br/><br/>
    <button onClick={display}> button</button>
</div>

<div style="width: 80%; float:right">
<GrammarlyEditorPlugin clientId="client_VnGHunVqY1HWNpMXAgmGc3">
    



    {/* Copy to clipboard - https://medium.com/nerd-for-tech/how-to-add-copy-to-clipboard-functionality-in-a-reactjs-app-45404413fdb2 */}
       <p>{name}</p>
       <button onClick={() => {
         navigator.clipboard.writeText(text);}}>
        Copy
       </button>


  
      <textarea value={name} ></textarea> 
    
    </GrammarlyEditorPlugin>
</div>





    <p>Microphone: {listening ? 'on' : 'off'}</p>
    <button onClick={SpeechRecognition.startListening}>Start</button>
    <button onClick={SpeechRecognition.stopListening}>Stop</button>
    <button onClick={resetTranscript}>Reset</button>
    <p>{transcript}</p>
    <br/><br/>
    <button onClick={display}> button</button>

    <label>Enter your name:
        <input
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {transcript}
      </label>
      <GrammarlyEditorPlugin clientId="client_VnGHunVqY1HWNpMXAgmGc3">
    



    {/* Copy to clipboard - https://medium.com/nerd-for-tech/how-to-add-copy-to-clipboard-functionality-in-a-reactjs-app-45404413fdb2 */}
       <p>{name}</p>
       <button onClick={() => {
         navigator.clipboard.writeText(text);}}>
        Copy
       </button>


  
      <textarea value={name} ></textarea> 
    
    </GrammarlyEditorPlugin>




    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  </div>



 
  );
}




export default App;
