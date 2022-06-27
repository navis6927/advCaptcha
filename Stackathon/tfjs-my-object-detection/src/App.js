import logo from './logo.svg';
import './App.css';
import ObjectDetector from './components/objectDetector';
import Navbar from './components/Navbar';
import {Route, BrowserRouter as Router} from 'react-router-dom'
import AboutUs from './components/AboutUs';

function App() {
  return (
   <Router>
    <Navbar/>
    <Route path='/' exact component={ObjectDetector}/>
    <Route path='/about' exact component={AboutUs}/>

   </Router>
  );
}

export default App;
