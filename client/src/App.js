import Landing from './screens/Landing';
import Layouts from './layouts/Layouts';
import Signup from './screens/Signup';
import Login from './screens/Login';
import MainContainer from './containers/MainContainer';
import {
  loginUser,
  registerUser,
  removeToken,
  verifyUser,
} from './services/auth';

import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();


  useEffect(() => {
    const handleVerify = async () => {
      const userData = await verifyUser();
      setCurrentUser(userData);
    };
    handleVerify();
  }, []);

  const handleSignup = async (formData) => {
    const userData = await registerUser(formData);
    setCurrentUser(userData);
    history.push('/');
  };

  const handleLogin = async (formData) => {
    const userData = await loginUser(formData);
    setCurrentUser(userData);
    history.push('/');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    removeToken();
  };


  return (
    <div className="App">
      <Layouts handleLogout={handleLogout} currentUser={currentUser}>
        <Switch>
          <Route path='/'>
            <MainContainer currentUser={currentUser} />
          </Route>
          <Route path='/login'>
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path='/signup'>
            <Signup handleSignup={handleSignup} />
          </Route>
        </Switch>
      </Layouts>
    </div>
  );
}

export default App;
