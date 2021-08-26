
import './App.css';
import Home from './Components/Home.js'
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Books from './Components/Books.js'

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from='/' to='/Home' />
         <Route exact path='/Home' >
           <Home/>
         </Route>
      </Switch>
    </Router>
    
  );
}

export default App

