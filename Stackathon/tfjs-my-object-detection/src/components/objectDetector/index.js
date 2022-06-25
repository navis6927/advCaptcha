import {Paper, Grid, Switch, Typography, FormGroup, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Button, TextField} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import Canvas from '../Canvas';
require('@tensorflow/tfjs-backend-cpu');
require('@tensorflow/tfjs-backend-webgl');
const cocoSsd = require('@tensorflow-models/coco-ssd');


function ObjectDetector() {
  const [value, setValue] = useState(false)
  const handleChange = (e) => {
    setValue(e.target.checked)
    const imageElement = document.createElement('img');
    imageElement.src = 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*';
    imageElement.crossOrigin='anonymous'
    imageElement.onload = async () => {
      await detectObjectOnImage(imageElement);
    }
  }

  console.log(document.getElementById('img-container'))

  const detectObjectOnImage = async (imageElem) => {
    const model = await cocoSsd.load({ });
    const predictions = await model.detect(imageElem, 6);
    console.log('Predictions: ', predictions)
  }
  function initDraw(canvas) {

    var canvas = document.getElementById('random-img')
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    var rect = {};

    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    let element = null;


    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(canvas, 0, 0);
            ctx.strokeStyle = 'red';

            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
          console.log(element)
            element = null;
            canvas.style.cursor = "default";
            console.log("finished.");

        } else {
            console.log("begun.");
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            console.log(mouse.startX, mouse.startY)
            element = document.createElement('div');
            element.className = 'rectangle'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            console.log(element)
            canvas.appendChild(element)
            canvas.style.cursor = "crosshair";
        }
    }
}


  useEffect(() => {
    if(document.getElementById('img-container')) {
      initDraw(document.getElementById('img-container'));
    }

  }, [value])


  return (
    <div>
      <Grid>
        <Typography>Please check the box below AND respond to the prompt to proceed</Typography>
      <Paper elevation={22} className='advcaptcha-container'>
      <FormGroup>
  <FormControlLabel control={<Switch checked={value} onChange={handleChange} color='primary'/>} label="I'm not a robot" />
  <Dialog className='dialog-container' aria-labelledby='dialog-title' open={value} onClose = {() => {setValue(false)}}>
    <DialogTitle align="center" id='dialog-title'>Draw a box around the image: </DialogTitle>
    <DialogContent className= 'dialog-popup'>
      <div id='img-container'>
      <Canvas id = 'random-img' className='canvas-style' />
      </div>
      <TextField required className= 'textfield-input' fullWidth placeholder='What is this an image of?' size="medium"></TextField>
    </DialogContent>
    <DialogActions>
      <Button>Submit</Button>
    </DialogActions>
  </Dialog>
</FormGroup>
        <Typography className='advcaptcha-notarobot-text'></Typography>
      </Paper>
      </Grid>
    </div>
  )
}

export default ObjectDetector
