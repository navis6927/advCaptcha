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
import { useNavigate } from "react-router-dom";
import cat from "../cat.jpg"
import advCaptcha from "../advCaptcha.png"

function AboutUs() {
  return (
    <Paper elevation={22} className="aboutus-main-paper">
      <Typography variant="h4" className="what-is-advcaptcha">What is advCaptcha?</Typography>
      <ul>
        <li>
        <Typography>advCaptcha is an online service for keeping out bots, spam, & abuse by asking two simple
        questions that will allow web developers to distinguish between bot and human. To allow a user to continue surfing their website, they must correctly draw a box that covers the focus of the image and confirms what the focus of the image is. Developers can implement advCaptcha to keep unwanted bot activity off their website.
      </Typography>
        </li>
      </ul>
      <hr className="horizontal-line"/>
      <Typography variant="h4" className="what-is-advcaptcha">How does it work?</Typography>
      <ul>
        <li>
        <Typography>advCaptcha utilizes Tensorflow.JS' object detection model using 'COCO-SSD' dataset
        to identify single/multiple objects in a single image/video/canvas. We use the predictions made
        by the object dectection model and the user's input to determine whether or not a human is trying to enter the website. The width and height of the rectangular-box from the user's input is compared to the width and height of the model's prediction.
      </Typography>
        </li>
      </ul>
      <hr className="horizontal-line"/>
      <img alt = '' className = 'cat-example' src="https://www.baeldung.com/wp-content/uploads/sites/4/2022/06/cat_detection.png"></img>
      <hr className="horizontal-line"/>
      <Typography variant="h4" className="what-is-advcaptcha">How does it look?</Typography>
      <img className = 'adv-captcha-photo' src={advCaptcha} alt = ''></img>
      <div>
      <img className = 'cat-example-ac' src={cat} alt = ''></img>
      <img className = 'cat-example-ac' src='https://debuggercafe.com/wp-content/uploads/2020/08/gt_pred_boxes.jpg' alt = ''></img>
      </div>
      <hr className="horizontal-line"/>
      <Typography variant="h4" className="what-is-advcaptcha">How accurate is this?</Typography>
      <ul>
        <li>
        <Typography>advCaptcha does consider that users will sometimes have a box size difference that what the model predicted. The number of failed attempts a IP can have can be controlled. For instance, a website can block a specific IP after 3 failed attempts, 5 failed attempts, 10 failed attempts, etc. In addition, the accuracy can be altered by the website developer. By default, users must not exceed a 10% error. This is calculated using the equation below:
      </Typography>
        </li>
      </ul>
      <img src='https://itu.physics.uiowa.edu/sites/itu.physics.uiowa.edu/files/styles/no_crop__768w/public/2021-08/percenterrorformula_eq1.png?itok=bc6NEOWt'></img>



      </Paper>
  )
}

export default AboutUs
