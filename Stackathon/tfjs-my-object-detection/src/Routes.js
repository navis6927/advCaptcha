import React, { Component, Fragment } from "react";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import ObjectDetector from "./components/objectDetector";

/**
 * COMPONENT
 */
class Routes extends Component {

  render() {

    return (
      <div>
          <Switch>
            <Route path="/" component={ObjectDetector} />
            <Route exact path="/about" component={AboutUs}/>
          </Switch>
          </div>



    );
  }
}

export default Routes
