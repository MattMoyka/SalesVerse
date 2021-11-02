import Landing from './screens/Landing';
import Layouts from './layouts/Layouts';

import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Layouts>
        <Switch>
          <Route exact path='/'>
            <Landing />
          </Route>
          <Route path='/login'>
            login
          </Route>
          <Route path='/signup'>
            Signup
          </Route>
        </Switch>
      </Layouts>
    </div>
  );
}

export default App;
