// IMPORTS
import {
  Paper,
  Grid,
  Switch,
  Typography,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
} from "@material-ui/core";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import Canvas from "../Canvas";
import photos from "../../photos";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import loadingLogo from "../../../src/loadingPhoto.gif"
import AboutUs from '../AboutUs'


// REQUIRES
require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");
const img = photos[Math.floor(Math.random()*photos.length-1)];


// FUNCTIONAL COMPONENT
function ObjectDetector(props) {
  // LOCAL STATE
  const [value, setValue] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [prediction, setPrediction] = useState([]);

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleChange = async (e) => {
    // initDraw(document.getElementById('img-container'))
    setValue(e.target.checked);
    await setTimeout(1000);
    initDraw(document.getElementById("img-container"));
    document.getElementById("random-img").style.backgroundImage=photos[Math.floor(Math.random()*photos.length-1)];
    const imageElement = document.createElement("img");
    // imageElement.src =
    //   "https://images.unsplash.com/photo-1594084442492-890cdf85dbcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8c2F2YW5uYWglMjBjYXR8ZW58MHx8MHx8&w=1000&q=80";
    imageElement.src = img;
    imageElement.crossOrigin = "anonymous";
    imageElement.onload = async () => {
      await detectObjectOnImage(imageElement);
    };
  };

  const detectObjectOnImage = async (imageElem) => {
    const model = await cocoSsd.load({});
    const predictions = await model.detect(imageElem, 6);
    setPrediction(predictions);
  };

  const handleComparison = async (imageElem, predictionResults) => {
    const finalRect = document.getElementsByClassName("rectangle").length - 1;
    const element = [
      document.getElementsByClassName("rectangle")[finalRect].style.left,
      document.getElementsByClassName("rectangle")[finalRect].style.top,
      document.getElementsByClassName("rectangle")[finalRect].style.width,
      document.getElementsByClassName("rectangle")[finalRect].style.height,
    ];

    const trueValueRatio =
      parseInt(prediction[0].bbox[3]) / parseInt(prediction[0].bbox[2]);

    const difference = Math.abs(
      parseInt(element[3]) / parseInt(element[2]) - trueValueRatio
    );
    const error = (difference / trueValueRatio) * 100;

    if (userInput.toLowerCase() === prediction[0].class && error < 9) {
      swal({
        title: "Good job!",
        text: "You solved the captcha successfully!",
        icon: "success",
      });
    } else {
      swal({
        title: "Error!",
        text: "You did not solve the captcha correctly..",
        icon: "error",
      });
    }
  };

  function initDraw(canvas) {
    var canvas = document.getElementById("random-img");
    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.fillStyle='#fa4b2a';
    var rect = {};


    function setMousePosition(e) {
      var ev = e || window.event; //Moz || IE
      if (ev.pageX) {
        //Moz
        mouse.x = ev.pageX + window.pageXOffset;
        mouse.y = ev.pageY + window.pageYOffset;
      } else if (ev.clientX) {
        //IE
        mouse.x = ev.clientX + document.body.scrollLeft;
        mouse.y = ev.clientY + document.body.scrollTop;
      }
    }

    var mouse = {
      x: 0,
      y: 0,
      startX: 0,
      startY: 0,
    };
    let element = null;

    canvas.onmousemove = function (e) {
      setMousePosition(e);
      if (element !== null) {
        // ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(canvas, 0, 0);
        ctx.strokeStyle = "blue";
        // ctx.fillRect(10, 40, 140, 160);
        ctx.fillRect(mouse.x - mouse.startX < 0 ? mouse.x : mouse.startX,  mouse.y - mouse.startY < 0 ? mouse.y: mouse.startY, Math.abs(mouse.x - mouse.startX), Math.abs(mouse.y - mouse.startY))
        element.style.width = Math.abs(mouse.x - mouse.startX) + "px";
        element.style.height = Math.abs(mouse.y - mouse.startY) + "px";
        element.style.left =
          mouse.x - mouse.startX < 0 ? mouse.x + "px" : mouse.startX + "px";
        element.style.top =
          mouse.y - mouse.startY < 0 ? mouse.y + "px" : mouse.startY + "px";

      }
    };

    canvas.onclick = function (e) {
      if (element !== null) {
        element = null;
        canvas.style.cursor = "default";
        console.log("finished.");
        console.log(mouse.x - mouse.startX < 0 ? mouse.x : mouse.startX,  mouse.y - mouse.startY < 0 ? mouse.y: mouse.startY, Math.abs(mouse.x - mouse.startX), Math.abs(mouse.y - mouse.startY))
        // ctx.fillRect(10, 40, Math.abs(mouse.x - mouse.startX), Math.abs(mouse.y - mouse.startY));

      } else {
        console.log("begun.");
        mouse.startX = mouse.x;
        mouse.startY = mouse.y;
        element = document.createElement("div");
        element.className = "rectangle";

        element.style.left = mouse.x + "px";
        element.style.top = mouse.y + "px";
        element.style.border = "3px solid black";
        element.style.zindex = "999";
        canvas.appendChild(element);
        canvas.style.cursor = "crosshair";
        // console.log(mouse.x,mouse.y, Math.abs(mouse.x - mouse.startX), Math.abs(mouse.y - mouse.startY))
      }
    };
  }

  useEffect(() => {}, [value]);

  const myStyle={
    backgroundImage:
`url("${img}")`,
    height: "250px",
    width: '250px',
    backgroundSize: '250px',
    border: "3px solid black",
    // zindex: "-1",

};

  return (
    <div>
      <Navbar />
      <Grid>
        <Paper className="about-advcaptcha" elevation={24} >
          <Typography className="advcaptcha-prompt" align="center">
            Please check the box below AND respond to the prompt to proceed:
          </Typography>
          <Paper elevation={22} className="advcaptcha-container">
            <FormGroup >
              <div className="formgroup">
              <FormControlLabel
                control={
                  <Switch
                    checked={value}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="I'm not a robot"
              />
              <div className="logo-name">
              <img className = 'navbar-logo'src={loadingLogo} alt='loadingLogo'/>
              <Typography className = 'advcaptcha-under-logo' variant="h6">AdvCaptcha</Typography>
              </div>

              </div>
              <Dialog
                className="dialog-container"
                aria-labelledby="dialog-title"
                open={value}
                onClose={() => {
                  setValue(false);
                }}
              >
                <DialogTitle align="center" id="dialog-title">
                  Draw a box around the image:{" "}
                </DialogTitle>
                <DialogContent className="dialog-popup">
                  <div id="img-container">
                    <Canvas id="random-img" style={myStyle} />
                  </div>
                  <TextField
                    value={userInput}
                    onChange={(e) => {
                      handleUserInput(e);
                    }}
                    required
                    className="textfield-input"
                    fullWidth
                    placeholder="What is this an image of?"
                    size="medium"
                  ></TextField>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      handleComparison();
                    }}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </FormGroup>
            <Typography className="advcaptcha-notarobot-text"></Typography>
          </Paper>
        </Paper>
      </Grid>
    </div>
  );
}

export default ObjectDetector;
